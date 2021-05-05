'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Companies', [
      {
        CompanyName: "Shields-Brekke",
        Address: "Minnesota",
        EmployeeSize: "100-150",
        Email: "marcos.toy@shieldsbrekke.com",
        PhoneNumber: "+1-202-555-0109",
        Website: "shieldsbrekke.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CompanyName: "Keebler Group",
        Address: "Phoenix",
        EmployeeSize: "500-1000",
        Email: "emie.rutherford@keebler.com",
        PhoneNumber: "+1-202-555-0121",
        Website: "keebler.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CompanyName: "Emmerich PLC",
        Address: "Washington",
        EmployeeSize: "500-1000",
        Email: "williamson.paula@emmerich.com",
        PhoneNumber: "+1-202-555-0167",
        Website: "emmerich.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CompanyName: "Strosin-Gislason",
        Address: "Washington",
        EmployeeSize: ">2000",
        Email: "dandre.donnelly@strosingislason.com",
        PhoneNumber: "+1-202-555-0156",
        Website: "strosingislason.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CompanyName: "Kovacek and Sons",
        Address: "Long Beach",
        EmployeeSize: "200-300",
        Email: "lang.grace@kovacekandsons.com",
        PhoneNumber: "+1-202-555-0109",
        Website: "kovacekandsons.com",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        CompanyName: "Ferry LLC",
        Address: "Long Beach",
        EmployeeSize: "800-1000",
        Email: "ipfannerstill@ferrygroup.com",
        PhoneNumber: "+1-202-555-0168",
        Website: "ferrygroup.com",
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Companies', null, {});
  }
};
