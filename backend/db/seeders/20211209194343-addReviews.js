'use strict';

module.exports = {
 up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
  "Reviews",
    [
      {
        userId: 1,
        spotId: 3,
        content:
          "I had such a great time at this location! The host even provided water, snacks and cutlery for us! My family will definitely be back.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 3,
        content:
          "Beautiful view and clean home. 10/10 experience, would definitely recommend to my fellow Gryffindors 😝.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        spotId: 13,
        content:
          "I had such a great time at this location! The host even provided water, snacks and cutlery for us! My family will definitely be back.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        spotId: 5,
        content:
          "I came here for a solo getaway and was not disappointed. The amenities are A1 and the host was very gracious for providing a neighborhood map to help me navigate the town.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 8,
        content:
          "I had such a great time at this location! The host even provided water, snacks and cutlery for us! My family will definitely be back.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 13,
        content:
          "I had such a great time at this location! The host even provided water, snacks and cutlery for us! My family will definitely be back.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 12,
        content:
          "Beautiful spot with beautiful views.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        spotId: 14,
        content:
          "Great space for family! Love that we had our own bathrooms!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {}
    );
  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Reviews', null, {});

  }
};
