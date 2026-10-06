import fs from 'fs';
import path from 'path';
import { DATA_DIR } from '../config/constants.js';
import Dress from '../models/Dress.js';
import Appointment from '../models/Appointment.js';
import Inquiry from '../models/Inquiry.js';
import Newsletter from '../models/Newsletter.js';
import Measurement from '../models/Measurement.js';
import Atelier from '../models/Atelier.js';

function readJsonFile(filename, defaultValue = []) {
  try {
    const filePath = path.join(DATA_DIR, filename.endsWith('.json') ? filename : `${filename}.json`);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (err) {
    console.warn(`[Seed Service] Could not read ${filename}:`, err.message);
  }
  return defaultValue;
}

export async function seedInitialData() {
  try {
    // 1. Seed Dresses
    const dressCount = await Dress.countDocuments();
    if (dressCount === 0) {
      const initialDresses = readJsonFile('dresses', []);
      if (initialDresses.length > 0) {
        await Dress.insertMany(initialDresses);
        console.log(`✦ [Database Seed] Seeded ${initialDresses.length} haute couture silhouettes into MongoDB.`);
      }
    }

    // 2. Seed Atelier info
    const atelierCount = await Atelier.countDocuments();
    if (atelierCount === 0) {
      const initialAtelier = readJsonFile('atelier', null);
      if (initialAtelier) {
        await Atelier.create(initialAtelier);
        console.log('✦ [Database Seed] Seeded Atelier heritage & salon profiles into MongoDB.');
      }
    }

    // 3. Seed Appointments (if any initial exist)
    const appointmentCount = await Appointment.countDocuments();
    if (appointmentCount === 0) {
      const initialAppointments = readJsonFile('appointments', []);
      if (initialAppointments.length > 0) {
        await Appointment.insertMany(initialAppointments);
        console.log(`✦ [Database Seed] Seeded ${initialAppointments.length} existing appointments into MongoDB.`);
      }
    }

    // 4. Seed Inquiries
    const inquiryCount = await Inquiry.countDocuments();
    if (inquiryCount === 0) {
      const initialInquiries = readJsonFile('inquiries', []);
      if (initialInquiries.length > 0) {
        await Inquiry.insertMany(initialInquiries);
        console.log(`✦ [Database Seed] Seeded ${initialInquiries.length} inquiries into MongoDB.`);
      }
    }

    // 5. Seed Newsletter
    const newsletterCount = await Newsletter.countDocuments();
    if (newsletterCount === 0) {
      const initialNewsletters = readJsonFile('newsletter', []);
      if (initialNewsletters.length > 0) {
        await Newsletter.insertMany(initialNewsletters);
        console.log(`✦ [Database Seed] Seeded ${initialNewsletters.length} newsletter subscribers into MongoDB.`);
      }
    }

    // 6. Seed Measurements
    const measurementCount = await Measurement.countDocuments();
    if (measurementCount === 0) {
      const initialMeasurements = readJsonFile('measurements', []);
      if (initialMeasurements.length > 0) {
        await Measurement.insertMany(initialMeasurements);
        console.log(`✦ [Database Seed] Seeded ${initialMeasurements.length} client measurement records into MongoDB.`);
      }
    }
  } catch (err) {
    console.error('✦ [Database Seed] Error during data seeding:', err.message);
  }
}
