'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.Photo, { foreignKey: 'photo_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' }); // if you have users linked
    }
  }

  Comment.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    content: DataTypes.TEXT,
    photo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  return Comment;
};
