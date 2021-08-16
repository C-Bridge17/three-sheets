'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    type: DataTypes.STRING
  }, {});
  Tag.associate = function (models) {
    Tag.hasMany(models.Drink, { foreignKey: 'tagId' })
  };
  return Tag;
};
