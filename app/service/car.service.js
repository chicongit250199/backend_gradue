import * as db from '../db/models';
import { HTTP_ERROR, HttpError } from '../config/error';
const _ = require ('lodash');

export function viewCar(userId) {
  return db.Car.findAll(
    {
      where: { user_id: userId }
    }).then(car =>{
      const id = _.map(car,'id');
      if (id.length === 0)
      {
     throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'User is not have car!');
      }
      else return car;
    });
}

