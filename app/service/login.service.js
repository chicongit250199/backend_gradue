import * as db from '../db/models';
import { HTTP_ERROR, HttpError } from '../config/error';
// import comparePassword from db.comparePassword()
const bcrypt = require('bcrypt');
export function login(userName, passWord) {
  return db.User.findOne({
    where: {
      userName: userName,
    }
  }).then(result => {
    if (!result){
      throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'UserName is not exits');
    }
    if (result && !bcrypt.compareSync(passWord,result.password)){
      throw new HttpError(HTTP_ERROR.BAD_REQUEST, 'Password incorrect');
    }
    else {

      return result;
    }
  });

}
