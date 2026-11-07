'use strict';

require('dotenv').config();

const pg = require('pg');

const { Sequelize } = require('sequelize');

let sequelize;

if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: pg,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} else {
  sequelize = new Sequelize({
    database: process.env.DB_DATABASE || 'postgres',
    username: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    dialectModule: pg,
    port: Number(process.env.DB_PORT) || 5432,
    password: process.env.DB_PASSWORD || '',
    logging: false,
  });
}

module.exports = {
  sequelize,
};
