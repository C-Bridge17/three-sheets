'use strict';
module.exports = (sequelize, DataTypes) => {
  const Checkin = sequelize.define('Checkin', {
    userId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {});
  Checkin.associate = function (models) {
    Checkin.belongsTo(models.Drink, { foreignKey: 'drinkId' })
    Checkin.belongsTo(models.User, { foreignKey: 'userId' })
  };
  return Checkin;
};
