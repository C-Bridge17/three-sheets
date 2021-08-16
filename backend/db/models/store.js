'use strict';
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    ownerId: DataTypes.INTEGER,
    title: DataTypes.STRING
  }, {});
  Store.associate = function (models) {
    Store.belongsTo(models.User, { foreignKey: 'ownerId' })
    Store.hasMany(models.Drink, { foreignKey: 'storeId' })
  };
  return Store;
};
