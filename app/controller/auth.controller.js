import express from 'express';
import { forgotPassword, verifyToken, resetPassword } from '../service/user-reset-password.service';
import {
  register,
  resendRegister
} from '../service/auth.service';
import { login } from '../service/login.service';

const passport = require('passport');

const auth = express.Router();

auth.post('/sign-in', (req, res, next) => {

  console.log(req.body)

  if(req.body){
    res.status(400, {sdfsd : sdfsd})
    res.send({user_infor:req.body })
  }
  // passport.authenticate('login', {}, (err, user, info) => {
  //   if (user) {
  //     return req.login(user, (_err) => {
  //       if (_err) {
  //         return next(_err);
  //       }
  //       return res.status(200)
  //         .json(user);
  //     });
  //   }
  //   return next(info);
  // })(req, res, next);
});
auth.post('/login',(req, res, next) => {
  console.log(req.body);
  const userName = req.body.username;
  const password = req.body.password;
  console.log(userName);
  login(userName, password)
    .then(t => res.status(200).json(t), next);
});
auth.post('/register', (req, res, next) => {
  register(req.body)
    .then(t => res.status(200).json(t), next);
});

auth.post('/register/resend-register-user', (req, res, next) => {
  resendRegister(req.body.email)
    .then(t => res.status(200).json(t), next);
});

auth.post('/password/forget', (req, res, next) => {
  forgotPassword(req.body.email)
    .then(t => res.status(200).json(t), next);
});

auth.get('/password/verify-token', (req, res, next) => {
  const { token, email } = req.query;
  verifyToken(token, email)
    .then(rs => {
      res.status(200)
        .json(rs);
    }).catch(next);
});

auth.post('/password/reset', async (req, res, next) => {
  try {
    const rs = await resetPassword(req.body);
    res.status(200)
      .json(rs);
  } catch (error) {
    next(error);
  }
});


export { auth };
