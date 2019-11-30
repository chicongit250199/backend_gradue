
module.exports = (sequelize, DataTypes) => {
  const car_model = sequelize.define('car_model', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING(250) },
        year: { type: DataTypes.INTEGER(4) },
        created_date: { type: DataTypes.DATE }
      },
      {
        tableName: 'car_model',
        timestamps: false,
        sequelize
      }
  );
  return car_model;
};

