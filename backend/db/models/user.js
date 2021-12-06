"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 50],
        },
      },
      houseAllegiance: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: [
            "firstName",
            "lastName",
            "hashedPassword",
            "email",
            "houseAllegiance",
            "createdAt",
            "updatedAt",
          ],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  User.associate = function (models) {
    User.hasMany(models.Spot, {foreignKey: 'userId', onDelete: 'CASCADE', hooks:true})
    User.hasMany(models.Review, {foreignKey: 'userId', onDelete: 'CASCADE', hooks:true})
    User.hasMany(models.Booking, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
  };
  User.prototype.toSafeObject = function () {
    // remember, this cannot be an arrow function
    const { id, firstName, lastName, houseAllegiance,  username, email } = this; // context will be the User instance
    return { id,firstName, lastName, houseAllegiance,  username, email };
  };
  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };
  User.login = async function ({ credential, password }) {
    const { Op } = require("sequelize");
    const user = await User.scope("loginUser").findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };
  User.signup = async function ({ firstName, lastName, houseAllegiance, username, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      firstName,
      lastName,
      houseAllegiance,
      username,
      email,
      hashedPassword,
    });
    console.log(user)
    return await User.scope("currentUser").findByPk(user.id);
  };


  return User;
};
