'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    location: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Store.associate = function (models) {
    Store.hasMany(models.Drink, { foreignKey: 'storeId' })
  };
  return Store;
};
