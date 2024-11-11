'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FavoriteGame.belongsTo(models.User);
    }
  }
  FavoriteGame.init({
    GameId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'GameId is required'
        },
        notEmpty: {
          msg: 'GameId is required'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      },
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'FavoriteGame',
  });
  return FavoriteGame;
};