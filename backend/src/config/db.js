import mongoose from 'mongoose';
import { MONGODB_URI, DB_NAME } from './constants.js';
import { seedInitialData } from '../services/seed.service.js';

let isConnected = false;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.warn('✦ [MongoDB] No MONGODB_URI provided in environment variables.');
    return false;
  }

  try {
    console.log('✦ [MongoDB] Connecting to MongoDB Atlas cluster...');

    mongoose.connection.on('connected', async () => {
      isConnected = true;
      console.log(`✦ [MongoDB] Successfully connected to database: "${mongoose.connection.name}"`);
      await seedInitialData();
    });

    mongoose.connection.on('error', (err) => {
      isConnected = false;
      console.error('✦ [MongoDB] Connection error:', err.message);
      if (err.message.includes('IP') || err.name === 'MongooseServerSelectionError') {
        console.warn('✦ [MongoDB Atlas Notice] If this fails to connect, please ensure your IP address is whitelisted in MongoDB Atlas Network Access: https://cloud.mongodb.com/');
      }
    });

    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      console.warn('✦ [MongoDB] Disconnected from MongoDB cluster.');
    });

    await mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME || 'maison_solene',
      serverSelectionTimeoutMS: 6000,
      autoIndex: true
    });

    isConnected = true;
    return true;
  } catch (err) {
    isConnected = false;
    console.error('✦ [MongoDB] Failed to connect to MongoDB Atlas:', err.message);
    if (err.name === 'MongooseServerSelectionError') {
      console.warn('✦ [Atlas Tip] Make sure you have added 0.0.0.0/0 (or your current IP) under "Network Access" in your MongoDB Atlas Dashboard.');
    }
    return false;
  }
}

export function isDbConnected() {
  return mongoose.connection.readyState === 1;
}

export function getDbStatus() {
  const states = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  return {
    state: states[mongoose.connection.readyState] || 'unknown',
    connected: mongoose.connection.readyState === 1,
    database: mongoose.connection.name || DB_NAME || null,
    host: mongoose.connection.host || null
  };
}

export default connectDB;
