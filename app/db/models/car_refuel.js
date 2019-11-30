module.exports = (sequelize, DataTypes) => {
  const car_refuel = sequelize.define('car_refuel', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        odo: { type: DataTypes.DOUBLE },
        price: { type: DataTypes.DOUBLE },
        refill: { type: DataTypes.DOUBLE },
        description: { type: DataTypes.STRING(250) },
        user_id: { type: DataTypes.INTEGER(11) },
        car_id: { type: DataTypes.INTEGER(11) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_refuel',
        timestamps: false,
        sequelize
      }
  );
  return car_refuel;
};


