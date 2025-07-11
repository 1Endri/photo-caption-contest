'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    }
  }, {
    tableName: 'users',
    underscored: true,
    timestamps: true,
    paranoid: true,
    freezeTableName: true,
  });

  User.associate = function(models) {
    User.hasMany(models.Photo, { foreignKey: 'user_id' });
    User.hasMany(models.Comment, { foreignKey: 'user_id' });
  };

  return User;
};
