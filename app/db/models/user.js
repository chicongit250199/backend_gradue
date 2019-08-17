const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const saltRounds = 10;

export const ROLE_TYPE = {
  USER: 0,
  GARAGE_SHOP: 1,
  ADMIN: 2
};

export default class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING(64) },
        password: { type: DataTypes.STRING(64) },
        created_date: { type: DataTypes.DATE },
        phone: { type: DataTypes.STRING(16) },
        role: { type: DataTypes.INTEGER },
        email: { type: DataTypes.STRING(255) },
        address: { type: DataTypes.TEXT },
        full_name: { type: DataTypes.STRING(250) },
        city: { type: DataTypes.STRING(250) },
        country: { type: DataTypes.STRING(250) },
        last_logined: { type: DataTypes.DATE }
      },
      {
        tableName: 'user',
        modelName: 'user',
        timestamps: false,
        sequelize
      }
    );
  }

  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
  }

  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
