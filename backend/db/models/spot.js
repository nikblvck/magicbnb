'use strict';
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lat: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      lng: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {}
  );
  Spot.associate = function(models) {
  Spot.hasMany(models.Image, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks:true});
  Spot.hasMany(models.Review, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
  Spot.hasMany(models.Booking, {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true});
  Spot.belongsTo(models.User, {foreignKey: 'userId'});
  };
  return Spot;
};
