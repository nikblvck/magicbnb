"use strict";
const bcrypt = require("bcryptjs");
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = bcrypt.hashSync("harrypotter", 10);

    let users = [
      {
        username: "demo_user",
        email: "demo_user@magicbnb.com",
        hashedPassword: password,
        firstName: "Demo",
        lastName: "User",
        houseAllegiance: "Slytherin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "bignik",
        email: "bignik@magicbnb.com",
        hashedPassword: password,
        firstName: "Nik",
        lastName: "Black",
        houseAllegiance: "Gryffindor",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    const numNewUsers = 51;

    for (let i = 2; i < numNewUsers; i++) {
      let newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        hashedPassword: bcrypt.hashSync(password, 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        houseAllegiance: "Gryffindor",
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(newUser);
    }

    return queryInterface.bulkInsert("Users", users, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  },
};
