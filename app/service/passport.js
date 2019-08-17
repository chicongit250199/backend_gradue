import db from '../db/models';
import winston from '../config/winston';
import APP_CONFIG from '../config/application';
import { FIELD_ERROR, FieldError, FormError, HttpError, HTTP_ERROR } from '../config/error';

const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

module.exports = function myPassport(passport) {
  passport.use('login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (async (req, username, password, done) => { // callback with email and account_key from our form
      winston.info(`Passport agent login check username: ${username}/password: ${password}`);
      const where = {
        username: username
      };
      const user = await db.User.findOne({
        where
      });

      winston.debug(`Got User: ${JSON.stringify(user)}`);
      if (!user) {
        return done(null, false, new FormError(new FieldError('userame', FIELD_ERROR.INVALID, 'Wrong username or password')));
      }

      if (user && !db.User.comparePassword(password, user.password)) {
        return done(null, false, new FormError(new FieldError('password', FIELD_ERROR.INVALID, 'Wrong username or password')));
      }

      if (!user.email_activated) {
        return done(null, false, new FormError(new FieldError('email', FIELD_ERROR.EMAIL_NOT_ACTIVATED, 'Account is not activated yet')))      }

      return done(null, user);
    })
  ));

  passport.serializeUser(function serializeUser(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function deserializeUser(user, done) {
    done(null, user);
  });

  passport.use(new JWTStrategy({
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_CONFIG.JWT.secret
    },
    async (jwtPayload, cb) => {
      const user = await db.User.findByPk(jwtPayload.id);
      return cb(null, user);
    }
  ));
};
