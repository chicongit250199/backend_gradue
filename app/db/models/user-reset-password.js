module.exports = (sequelize, DataTypes) => {
  const user_reset_password = sequelize.define('user_reset_password', {
        email: { type: DataTypes.STRING(255), primaryKey: true },
        token: { type: DataTypes.STRING(255) },
        date_created: { type: DataTypes.DATE },
        confirmed: { type: DataTypes.BOOLEAN }
      },
      {
        tableName: 'user_reset_password',
        // modelName: 'user_reset_password',
        timestamps: false,
        sequelize
      }
  );
  return user_reset_password;
};

