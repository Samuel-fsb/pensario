'use strict';

require('dotenv').config();

const express = require('express');
const { authRoutes } = require('./backend/routes/auth-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const createServer = () => {
  const server = express();

  server.use(express.json());
  server.use(cookieParser());

  const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
    process.env.CORS_ORIGIN,
  ].filter(Boolean);

  server.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
          return callback(null, true);
        }

        return callback(null, false);
      },
      credentials: true,
    }),
  );

  server.use('/', authRoutes);

  return server;
};

const app = createServer();

const PORT = Number(process.env.PORT) || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = app;
module.exports.createServer = createServer;
