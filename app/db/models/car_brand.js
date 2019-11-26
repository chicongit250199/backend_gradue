const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

export default class car_brand extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(250) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_brand',
        modelName: 'car_brand',
        timestamps: false,
        sequelize
      }
    );
  }
}
