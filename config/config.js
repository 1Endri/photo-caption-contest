require('dotenv').config();
const fs = require('fs');
const path = require('path');

module.exports = {
  development: {
    username: process.env.DB_USERNAME, 
    password: process.env.DB_PASSWORD,  
    database: process.env.DB_NAME,      // photo_caption_db
    host: process.env.DB_HOST,          // localhost
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    dialectOptions: {
      decimalNumbers: true,        // Proper decimal handling
      supportBigNumbers: true,     // For large integers
      bigNumberStrings: false      // Prevents number-to-string coercion
    },
    pool: {
      max: 5,                      // Max connections
      min: 0,
      acquire: 30000,              // 30s connection timeout
      idle: 10000                  // 10s idle timeout
    },
    logging: console.log,          // Query logging in dev
    define: {
      underscored: true,           // snake_case fields
      timestamps: true,            // createdAt/updatedAt
      paranoid: true,              // deletedAt for soft deletes
      freezeTableName: true        // Prevent pluralization
    }
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_test`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false,                // Disable logging in tests
    pool: {
      max: 1                       // Single connection for tests
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: `${process.env.DB_NAME}_prod`,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    dialectOptions: {
      ssl: process.env.DB_SSL === 'true' ? {
        require: true,
        ca: process.env.DB_CA_PATH ? 
          fs.readFileSync(path.resolve(__dirname, process.env.DB_CA_PATH)) : 
          undefined
      } : {},
      decimalNumbers: true,
      supportBigNumbers: true
    },
    pool: {
      max: 10,                     // Higher for production
      min: 2,
      acquire: 60000,              // 60s timeout
      idle: 30000                  // 30s idle
    },
    logging: false,                // Disable in production
    define: {
      underscored: true,
      timestamps: true,
      paranoid: true
    }
  }
};