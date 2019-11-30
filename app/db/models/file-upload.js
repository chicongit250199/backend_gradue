
module.exports = (sequelize, DataTypes) => {
  const file_upload = sequelize.define('file_upload', {
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
  return file_upload;
};

