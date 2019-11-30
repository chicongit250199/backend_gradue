
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING(64) },
        password: { type: DataTypes.STRING(64) },
        created_date: { type: DataTypes.DATE },
        phone: { type: DataTypes.STRING(16) },
        role: { type: DataTypes.INTEGER },
        email: { type: DataTypes.STRING(255) },
        address: { type: DataTypes.TEXT },
        full_name: { type: DataTypes.STRING(250) },
        city: { type: DataTypes.STRING(250) },
        country: { type: DataTypes.STRING(250) },
        token: { type: DataTypes.STRING(250) },
        last_logined: { type: DataTypes.DATE }
      },
      {
        tableName: 'user',
        timestamps: false,
        sequelize
      }
  );

  return user;
};


