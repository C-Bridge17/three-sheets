'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    tagId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {});
  Drink.associate = function (models) {
    Drink.belongsTo(models.Tags, { foreignKey: 'tagId' })
    Drink.belongsTo(model.Store, { foreignKey: 'storeId' })
    Drink.hasMany(models.Checkin, { foreignKey: 'drinkId' })
  };
  return Drink;
};
