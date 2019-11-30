module.exports = (sequelize, DataTypes) => {
  const garage = sequelize.define('garage', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      garage_type: { type: DataTypes.STRING(250) },
      email: { type: DataTypes.STRING(250) },
      address: { type: DataTypes.STRING(250) },
      country: { type: DataTypes.STRING(250) },
      province: { type: DataTypes.STRING(250) },
      phone_1: { type: DataTypes.STRING(20) },
      phone_2: { type: DataTypes.STRING(20)},
      service_type: { type: DataTypes.INTEGER(11)},
      UserId: { type: DataTypes.INTEGER(11)},
      image: { type: DataTypes.STRING(250)},
      created_date: { type: DataTypes.DATE }
    },
    {
      tableName: 'garage',
      // modelName: 'Car_brand',
      timestamps: false,
      sequelize
    }
  );
  return garage;
};

