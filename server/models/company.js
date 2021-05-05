'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Company.belongsToMany(models.User, {through: models.UserFavoriteCompany})
    }
  };
  Company.init({
    CompanyName: DataTypes.STRING,
    Address: DataTypes.STRING,
    EmployeeSize: DataTypes.STRING,
    Email: DataTypes.STRING,
    PhoneNumber: DataTypes.STRING,
    Website: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};