module.exports = (sequelize, DataTypes) => {
  const car = sequelize.define('car', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(255) },
        registration_no: { type: DataTypes.STRING(64) },
        engine_type: { type: DataTypes.INTEGER(11) },
        carBrandId: { type: DataTypes.INTEGER(11) },
        carModelId: { type: DataTypes.INTEGER(11) },
        odo: { type: DataTypes.DOUBLE },
        car_vin: { type: DataTypes.STRING(250) },
        image_url: { type: DataTypes.STRING(250) },
        userId: { type: DataTypes.INTEGER(11) },
        income: { type: DataTypes.DOUBLE },
        maintenance: { type: DataTypes.INTEGER(11) },
        // expense: { type: DataTypes.DOUBLE },
        // profit: { type: DataTypes.DOUBLE },
        // condition: { type: DataTypes.STRING(250) },
        created_date: { type: DataTypes.DATE },
      },
      {
        tableName: 'car',
        // modelName: 'Car',
        timestamps: false,
        sequelize
      }
  );
  return car;
};

