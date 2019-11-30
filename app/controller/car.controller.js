import express, { json } from 'express';
import * as carService from '../service/car.service';

const carRouter = express.Router();

carRouter.get('/view', (req, res, next) => {
  const {userId} = req.body;
  carService.viewCar(userId)
    .then(t => res.status(200).json(t), next);
});
carRouter.get('/view/detail',(req, res, next) => {
  const {carId} = req.body;
  carService.viewDetail(carId)
    .then(t => res.status(200).json(t), next);
});
carRouter.post('/add',(req, res, next) =>{
  const values = req.body;
  carService.addCar(values)
    .then(t => res.status(200).json(t), next);
});
export { carRouter };

