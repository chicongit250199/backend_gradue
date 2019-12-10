import db from '../db/models';
import { sendResetPassword } from './email.service';
import { differentHours } from '../util/date.util';
import { HttpError, HTTP_ERROR } from '../config/error';

const md5 = require('md5');

export async function forgotPassword(email) {
  console.log(email);
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, `Email is not exist!`);
    }
    // if (!user.email_activated) {
    //     throw new HttpError(HTTP_ERROR.BAD_REQUEST, `Email is not activated yet!`);
    // }
    return db.sequelize.transaction()
        .then(async (transaction) => {
            try {
                const token = md5(`${email}-${new Date()}`);
                const dateCreated = new Date();
                let urp =  await db.UserResetPassword.findOne({
                    where: { email }
                });
                if (urp) {
                    urp.destroy({ transaction });
                }
                urp = db.UserResetPassword.create(
                    {
                        email,
                        token,
                        date_created: dateCreated
                    },
                    { transaction }
                );

                await sendResetPassword(user.email, user.username, token);

                await transaction.commit();

                return urp;
            } catch (e) {
                await transaction.rollback();
                throw e;
            }
        });
}

export async function resetPassword({ email, token, password, retypePassword }) {
    const userResetPassword = await db.UserResetPassword.findOne({
        where: { email, token }
    });

    if (userResetPassword && !userResetPassword.confirmed) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, "Token is not confirmed yet!");
    }

    if (differentHours(new Date(), userResetPassword.dateCreated) > 24) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, "Token has been expired!");
    }

    if (!(password.trim())) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, `Password can not be empty!`);
    }

    if (password.trim() !== retypePassword.trim()) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, `Retype password does not match`);
    }

    return db.sequelize.transaction()
        .then(async (transaction) => {
            try {
                await db.User.update(
                    { password: db.User.hashPassword(password.trim()) },
                    { where: { username: email }, transaction }
                );
                await userResetPassword.destroy({ transaction });
                await transaction.commit();

                return email;
            } catch (e) {
                await transaction.rollback();
                throw e;
            }
        });
}

export async function verifyToken(token, email) {
    const userResetPassword = await db.UserResetPassword.findOne({
        where: { token, email }
    });

    if (!userResetPassword) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, "Invalid Token");
    }

    if (differentHours(new Date(), userResetPassword.dateCreated) > 24) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, "Token has been expired");
    }

    userResetPassword.confirmed = 1;

    return userResetPassword.save();
}
