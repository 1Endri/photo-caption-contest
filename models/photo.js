module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define('Photo', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    caption: {
      type: DataTypes.TEXT
    }
  }, {
    indexes: [
      {
        fields: ['title']
      }
    ]
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.User);
    Photo.hasMany(models.Comment);
  };

  return Photo;
};