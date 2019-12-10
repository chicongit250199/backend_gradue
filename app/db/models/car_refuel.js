module.exports = (sequelize, DataTypes) => {
  const Car_refuel = sequelize.define('Car_refuel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        odo: { type: DataTypes.DOUBLE },
        price: { type: DataTypes.DOUBLE },
        refill: { type: DataTypes.DOUBLE },
        description: { type: DataTypes.STRING(250) },
        user_id: { type: DataTypes.INTEGER(11) },
        carId: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_refuel',
        timestamps: false,
        sequelize
      }
  );
  return Car_refuel;
};


