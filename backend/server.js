import 'dotenv/config';
import app from './src/app.js';
import { PORT } from './src/config/constants.js';
import { connectDB } from './src/config/db.js';

async function bootstrap() {
  // Start Express API server immediately so Render detects port binding without timeout
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✦ Maison Solène Atelier API listening on 0.0.0.0:${PORT}`);
    console.log(`✦ Health check endpoint: http://localhost:${PORT}/api/health`);
  });

  // Connect to MongoDB Atlas (seeds data when connected; falls back to local storage if offline)
  connectDB().catch((err) => {
    console.warn('✦ [MongoDB] Connection error notice:', err.message);
  });

  // Graceful shutdown handling for container/cloud platforms
  const handleShutdown = (signal) => {
    console.log(`✦ [Server] ${signal} signal received: closing Maison Solène API server...`);
    server.close(() => {
      console.log('✦ [Server] HTTP server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
}

bootstrap().catch((err) => {
  console.error('✦ Error bootstrapping Maison Solène API:', err);
});

