import * as db from '../db/models';
import { HTTP_ERROR, HttpError } from '../config/error';
import car_product from '../db/models/car_product';
import Car from '../db/models/car';
import log from '../config/winston';
import { throws } from 'should';
import { error } from 'winston';
const _ = require ('lodash');
// View all car of an user
export function viewCar(userId) {
  return db.Car.findAll(
    {
      attributes: ['id', 'name','registration_no'],
       where: { userId: userId }
    }).then(car =>{
      const id = _.map(car,'id');
      if (id.length === 0)
      {
     throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'User is not have car!');
      }
      else return  car;
    });
}
// View car detail
export function viewDetail(carId) {
  return db.Car.findOne(
    {
      attributes: ['id','name','registration_no','engine_type','odo','car_vin','image_url','income'],
      where: {
        id: carId
      },
      include: [
        {
          model: db.Car_brand, attributes: ['name']
        },
        {
          model: db.Car_model, attributes: ['name']
        },
        {
        model: db.Car_product, attributes: ['type','total_amount']
      },
        {
          model: db.Car_refuel, attributes: ['odo','price','refill']
        }
      ],
    })
    .then(detail => {
      if (detail.length === 0) {
        throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Can not found values of this car product!');
      }
      return detail;
    });
}
//
export async function addCar(values) {
  const exitedCar = await db.Car.findOne({where: {name: values.name, userId: values.userId}});
  if (exitedCar){
    throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Car already exits');
  }
      try {
        const newCar = await db.Car.create({
          name: values.name,
          registration_no: values.registration_no,
          engine_type: values.engine_type,
          carBrandId: values.carBrandId,
          carModelId: values.carModelId,
          odo: values.odo,
          car_vin: values.car_vin,
          image_url: values.image_url,
          userId: values.userId,
          income: values.income,
          maintenance: values.maintenance,
          expense: values.expense,
          profit: values.profit,
          condition: values.condition
        });
        log.info(`Created car ${JSON.stringify(newCar)}`);
        return newCar;
      } catch (e) {
        log.info(JSON.stringify(e));
        throw new HttpError(HTTP_ERROR.INTERNAL_SERVER_ERROR, `Internal server error! Please try again later. `);
      }
}


