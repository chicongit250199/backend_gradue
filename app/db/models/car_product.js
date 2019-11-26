const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

export default class car_product extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.INTEGER(11) },
        total_amount: { type: DataTypes.DECIMAL(10,0) },
        user_id: { type: DataTypes.INTEGER(11) },
        car_id: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_product',
        modelName: 'car_product',
        timestamps: false,
        sequelize
      }
    );
  }
}
