module.exports = (sequelize, DataTypes) => {
  const Car_brand = sequelize.define('car_brand', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(250) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_brand',
        // modelName: 'Car_brand',
        timestamps: false,
        sequelize
      }
  );
  return Car_brand;
};

