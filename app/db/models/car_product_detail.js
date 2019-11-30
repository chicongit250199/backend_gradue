
module.exports = (sequelize, DataTypes) => {
  const Car_product_detail = sequelize.define('Car_product_detail', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        item: { type: DataTypes.STRING(250) },
        quantity: { type: DataTypes.INTEGER(11) },
        price: { type: DataTypes.DECIMAL(10, 0) },
        CarProductId: { type: DataTypes.INTEGER(11), foreignKey: true },
      created_date: { type: DataTypes.DATE }
  },
    {
        tableName: 'car_product_detail',
        // modelName: 'Car_product_',
        timestamps: false,
        sequelize
      }
    );
  return Car_product_detail;
};
