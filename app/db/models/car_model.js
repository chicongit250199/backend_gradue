const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

export default class car_model extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(250) },
        year: { type: DataTypes.INTEGER(4) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_model',
        modelName: 'car_model',
        timestamps: false,
        sequelize
      }
    );
  }
}
