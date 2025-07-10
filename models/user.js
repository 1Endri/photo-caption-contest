module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
  });

  User.associate = function(models) {
    User.hasMany(models.Photo);
    User.hasMany(models.Comment);
  };

  return User;
};