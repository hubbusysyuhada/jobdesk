'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserFavoriteCompany extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserFavoriteCompany.belongsTo(models.User)
      UserFavoriteCompany.belongsTo(models.Company)
    }
  };
  UserFavoriteCompany.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: DataTypes.INTEGER,
    CompanyId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserFavoriteCompany',
  });
  return UserFavoriteCompany;
};