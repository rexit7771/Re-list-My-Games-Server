'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wishlist.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Wishlist.init({
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: "User ID is required"
        },
        notNull: {
          msg: "User ID is required"
        },
      },
      references: {
        model: "Users",
        key: "id"
      }
    },
    gameId: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Game ID is required"
        },
        notNull: {
          msg: "Game ID is required"
        },
      }
    }
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};