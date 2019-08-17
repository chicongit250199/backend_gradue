const Sequelize = require('sequelize');

export default class EmailSend extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init(
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        from: { type: DataTypes.STRING(150) },
        to: { type: DataTypes.TEXT },
        cc: { type: DataTypes.TEXT },
        bcc: { type: DataTypes.TEXT },
        subject: { type: DataTypes.STRING(512) },
        content: { type: DataTypes.TEXT },
        status: { type: DataTypes.BOOLEAN },
        retry: { type: DataTypes.INTEGER },
        api_response: { type: DataTypes.TEXT },
        sent_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'email_send',
        modelName: 'email_send',
        timestamps: false,
        sequelize
      }
    );
  }
}
