const Sequelize = require('sequelize');

export const DOCUMENT_TYPE = Object.freeze({
  ID_CARD: 0,
  PASSPORT: 1,
  DRIVING_LICENCE: 2,
  ADDRESS_CARD: 3,
  PHOTO: 4
});

export default class FileUpload extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: { type: DataTypes.INTEGER(11) },
        file_name: { type: DataTypes.STRING(255) },
        original_name: { type: DataTypes.STRING(255) },
        file_size: { type: DataTypes.INTEGER(11) },
        file_type: { type: DataTypes.STRING(100) },
        description: { type: DataTypes.STRING(255) },
        created_date: { type: DataTypes.DATE },
        user_document_type: { type: DataTypes.INTEGER(11) }
      },
      {
        tableName: 'file_upload',
        timestamps: false,
        sequelize
      }
    );
  }
}
