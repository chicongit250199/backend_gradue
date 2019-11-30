
module.exports = (sequelize, DataTypes) => {
  const Car_product = sequelize.define('Car_product', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        type: { type: DataTypes.INTEGER(11) },
        total_amount: { type: DataTypes.DECIMAL(10,0) },
        userId: { type: DataTypes.INTEGER(11), foreignKey: true },
        carId: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
  },
    {
        tableName: 'car_product',
        // modelName: 'Car_product',
        timestamps: false,
        sequelize
      }
  );
  return Car_product;
};
