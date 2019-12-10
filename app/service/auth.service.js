import * as db from '../db/models';
import { HttpError, HTTP_ERROR } from '../config/error';
import log from '../config/winston';
const bcrypt = require('bcrypt');
const randomstring = require("randomstring");

const validator = require('validator');

export async function register(formCreate) {
  console.log(formCreate);
  console.log(formCreate.username);

    // validate user input
    if (!formCreate.email || !formCreate.email.trim()) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Email is required!');
    }

    const _email = formCreate.email.trim().toLowerCase();

    if (!validator.isEmail(_email)) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Email is invalid!');
    }

    if (!validator.isLength(formCreate.username.trim(), { min: 4, max: undefined })) {
      throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Username must be at least 4 characters');
    }

    if (!validator.isLength(formCreate.password.trim(), { min: 4, max: undefined })) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Password must be at least 4 characters');
    }

    // check and insert in database
    const existedUser = await db.User.findOne({ where: { username: formCreate.username.trim() } });

    if (existedUser) {
       throw new HttpError(HTTP_ERROR.BAD_REQUEST, ' Username is already used!');
    }

    const existedEmail = await db.User.findOne({ where: { email: _email } });

    if (existedEmail) {
      throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Email is already used!');
    }
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  function hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

    return db.sequelize.transaction()
        .then(async (t) => {
            try {
                const newUser = await db.User.create({
                    username: formCreate.username,
                    email: _email,
                    created_date: new Date(),
                    role: formCreate.role,
                    full_name: formCreate.fullName,
                    phone: formCreate.phone,
                    address: formCreate.address,
                    city: formCreate.city,
                    country: formCreate.country,
                    password: hashPassword(formCreate.password.trim()),
                    token: randomstring.generate(15)
                }, { transaction: t });

                await t.commit();

                log.info(`Send event user: register ${JSON.stringify(newUser)}`);

                return newUser;
            } catch (e) {
                await t.rollback();
                log.info(JSON.stringify(e));
                throw new HttpError(HTTP_ERROR.INTERNAL_SERVER_ERROR, `Internal server error! Please try again later. `);
            }
        });
}

export async function resendRegister(email) {
    return db.User.findOne({ where: { username: email } })
        .then(user => {
            if (!user) {
                throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'User is not existed !');
            };
            return user;
        })
        .catch(e => {
            log.info(JSON.stringify(e));
            throw new HttpError(HTTP_ERROR.INTERNAL_SERVER_ERROR, `Internal server error! Please try again later. `);
        })
}
