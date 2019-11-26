const Sequelize = require('sequelize');
// const bcrypt = require('bcrypt');

export default class car_refuel extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        odo: { type: DataTypes.DOUBLE },
        price: { type: DataTypes.DOUBLE },
        refill: { type: DataTypes.DOUBLE },
        description: { type: DataTypes.STRING(250) },
        user_id: { type: DataTypes.INTEGER(11) },
        car_id: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_refuel',
        modelName: 'car_refuel',
        timestamps: false,
        sequelize
      }
    );
  }
}
