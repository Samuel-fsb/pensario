'use strict';

require('dotenv').config();

const { sequelize } = require('./backend/utils/db');
// eslint-disable-next-line no-unused-vars
const { Token } = require('./backend/models/token-model');
// eslint-disable-next-line no-unused-vars
const { User } = require('./backend/models/user-model');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection authenticated.');
    await sequelize.sync();
    console.log('Database synced successfully.');

    if (require.main === module) {
      process.exit(0);
    }
  } catch (error) {
    console.error('Failed to sync database:', error);

    if (require.main === module) {
      process.exit(1);
    }
    throw error;
  }
};

if (require.main === module) {
  syncDatabase();
}

module.exports = {
  syncDatabase,
};
