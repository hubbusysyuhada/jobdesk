'use strict';
const {hashPassword} = require('../helpers/bcrypt')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        Username: 'Benjamin',
        Email: 'benjamin@mail.com',
        Password: hashPassword('benjamin'),
        Confirmation: 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: 'Rita',
        Email: 'rita@mail.com',
        Password: hashPassword('rita'),
        Confirmation: 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: 'Tokyo',
        Email: 'tokyo@mail.com',
        Password: hashPassword('tokyo'),
        Confirmation: 'true',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
