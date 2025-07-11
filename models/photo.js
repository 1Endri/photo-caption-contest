'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Photo extends Model {
    static associate(models) {
      this.hasMany(models.Comment, { foreignKey: 'photo_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' }); // if you have users linked
    }
  }

  Photo.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    thumbnail_url: DataTypes.STRING,
    caption: DataTypes.TEXT,
    user_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
    deleted_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Photo',
    tableName: 'photos',
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  return Photo;
};
