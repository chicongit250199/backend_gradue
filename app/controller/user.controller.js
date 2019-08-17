import express from 'express';
import { isAuthenticated } from '../service/permission';
import * as userService from '../service/user.service';

const userRouter = express.Router();

userRouter.get('/bankcard/', isAuthenticated, (req, res, next) => {
    userService.userBankcard(req.user.id)
        .then(t => res.status(200).json(t), next);
});

export { userRouter }
