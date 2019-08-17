const Sequelize = require('sequelize');

export default class UserResetPassword extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        email: { type: DataTypes.STRING(255), primaryKey: true },
        token: { type: DataTypes.STRING(255) },
        date_created: { type: DataTypes.DATE },
        confirmed: { type: DataTypes.BOOLEAN }
      },
      {
        tableName: 'user_reset_password',
        modelName: 'user_reset_password',
        timestamps: false,
        sequelize
      }
    );
  }
}
