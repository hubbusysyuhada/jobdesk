'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        Username: 'Benjamin',
        Email: 'benjamin@mail.com',
        Password: hashPassword('benjamin'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: 'Rita',
        Email: 'rita@mail.com',
        Password: hashPassword('rita'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: 'Tokyo',
        Email: 'tokyo@mail.com',
        Password: hashPassword('tokyo'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
