const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

export default class car_product_detail extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        item: { type: DataTypes.STRING(250) },
        quantity: { type: DataTypes.INTEGER(11) },
        price: { type: DataTypes.DECIMAL(10,0) },
        car_product_id: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_product_detail',
        modelName: 'car_product_detail',
        timestamps: false,
        sequelize
      }
    );
  }
}
