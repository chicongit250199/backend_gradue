// import User from './user';
// import UserResetPassword from './user-reset-password';
// import EmailSend from './email_send';
// import FileUpload from './file-upload';
// import Car from './car';
// import Car_product from './car_product';
// import Car_brand from './car_brand';
// import Car_product_detail from './car_product_detail';
// import Car_refuel from './car_refuel';
// import Car_model from './car_model';
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];

let sequelize;
sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.Siquelize =Sequelize;
db.sequelize = sequelize;
//Models
db.Car=require('../models/car.js')(sequelize, Sequelize);
db.Car_brand=require('../models/car_brand.js')(sequelize, Sequelize);
db.Car_model=require('../models/car_model.js')(sequelize, Sequelize);
db.Car_product = require('../models/car_product.js')(sequelize, Sequelize);
db.Car_product_detail=require('../models/car_product_detail.js')(sequelize, Sequelize);
db.Car_refuel=require('../models/car_refuel.js')(sequelize, Sequelize);
db.EmailSend=require('../models/email_send.js')(sequelize, Sequelize);
db.File_upload=require('../models/file-upload.js')(sequelize, Sequelize);
db.User=require('../models/user.js')(sequelize, Sequelize);
db.UserResetPassword=require('../models/user-reset-password.js')(sequelize, Sequelize);
db.Garage=require('../models/garage.js')(sequelize, Sequelize);

//Relation
db.Car_product.hasOne(db.Car_product_detail);
db.Car.hasMany(db.Car_refuel);
db.Car.hasMany(db.Car_product);
db.Car.belongsTo(db.Car_brand);
db.Car.belongsTo(db.Car_model)
db.User.hasMany(db.Car);
db.User.hasMany(db.File_upload);
db.User.hasOne(db.Garage);


Object.values(db)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

// models.sequelize = sequelize;
// models.Sequelize = Sequelize;
module.exports = db;
// module.exports = function comparePassword(password, hash);
// module.exports = models;
