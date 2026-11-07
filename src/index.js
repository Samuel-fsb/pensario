'use strict';

require('dotenv').config();

const express = require('express');
const { authRoutes } = require('./backend/routes/auth-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const { sequelize } = require('./backend/utils/db');

const normalizeOrigin = (value) => {
  if (!value) {
    return null;
  }

  try {
    return new URL(value.trim()).origin;
  } catch {
    return null;
  }
};

const createServer = () => {
  const server = express();
  const allowedOrigins = new Set(
    [
      'http://localhost:5173',
      'https://pensario-alpha.vercel.app',
      process.env.FRONTEND_URL,
      ...(process.env.CORS_ORIGIN || '').split(','),
    ]
      .map(normalizeOrigin)
      .filter(Boolean),
  );

  // CORS vem antes dos parsers para responder corretamente às requisições OPTIONS.
  server.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(normalizeOrigin(origin))) {
          return callback(null, true);
        }

        return callback(null, false);
      },
      credentials: true,
    }),
  );

  server.use(express.json());
  server.use(cookieParser());

  // Endpoint básico para confirmar que a função Express está respondendo.
  server.get('/', (_req, res) => {
    return res.status(200).json({
      name: 'Pensário API',
      status: 'online',
      health: '/health',
    });
  });

  // Verifica separadamente a conexão real com o PostgreSQL.
  server.get('/health', async (_req, res) => {
    try {
      await sequelize.authenticate();

      return res.status(200).json({
        status: 'ok',
        database: 'connected',
      });
    } catch (error) {
      console.error('Database health check failed:', error.message);

      return res.status(503).json({
        status: 'error',
        database: 'disconnected',
      });
    }
  });

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
