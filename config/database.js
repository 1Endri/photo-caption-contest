require('dotenv').config();
const fs = require('fs');
const path = require('path');

const getSSLOptions = () => {
  const sslEnabled = process.env.DB_SSL === 'true';
  const caPath = process.env.DB_CA_PATH;

  if (sslEnabled && caPath) {
    const fullCaPath = path.resolve(__dirname, caPath);
    if (fs.existsSync(fullCaPath)) {
      return {
        rejectUnauthorized: true,
        ca: fs.readFileSync(fullCaPath)
      };
    }
  }

  return undefined;
};

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: getSSLOptions(),
      decimalNumbers: true,
      supportBigNumbers: true,
      bigNumberStrings: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: console.log,
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    }
  },

  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    }
  },

  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_prod`,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      ssl: getSSLOptions(),
      decimalNumbers: true,
      supportBigNumbers: true
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 60000,
      idle: 30000
    },
    logging: false,
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true,
      freezeTableName: true
    }
  }
};
