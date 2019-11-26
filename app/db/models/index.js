import User from './user';
import UserResetPassword from './user-reset-password';
import EmailSend from './email_send';
import FileUpload from './file-upload';
import Car from './car';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];

let sequelize;
  sequelize = new Sequelize(config.database, config.username, config.password, config);

const models = {
  User: User.init(sequelize, Sequelize),
  UserResetPassword: UserResetPassword.init(sequelize, Sequelize),
  EmailSend: EmailSend.init(sequelize, Sequelize),
  FileUpload: FileUpload.init(sequelize, Sequelize),
  Car: Car.init(sequelize, Sequelize)
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
