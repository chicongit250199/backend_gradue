import express from 'express'
import * as carService from '../service/car.service';

const carRouter = express.Router();

carRouter.get('/view', (req, res, next) => {
  const {userId} = req.body;
  carService.viewCar(userId)
    .then(t => res.status(200).json(t), next);
});

export { carRouter };

