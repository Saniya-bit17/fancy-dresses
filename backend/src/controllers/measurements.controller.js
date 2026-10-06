import crypto from 'crypto';
import { storage } from '../services/storage.service.js';

export const saveMeasurements = async (req, res, next) => {
  try {
    const { clientName, email, dressId, measurements } = req.body;

    if (!measurements || typeof measurements !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Measurement data object is required.'
      });
    }

    const record = {
      id: crypto.randomUUID(),
      reference: `MEAS-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      clientName: (clientName || 'Private Client').trim(),
      email: (email || '').trim().toLowerCase(),
      dressId: dressId || 'general',
      measurements: {
        bust: measurements.bust || null,
        waist: measurements.waist || null,
        hip: measurements.hip || null,
        height: measurements.height || null,
        highBust: measurements.highBust || null,
        underBust: measurements.underBust || null,
        acrossBack: measurements.acrossBack || null,
        hollowToHem: measurements.hollowToHem || null,
        ...measurements
      },
      createdAt: new Date().toISOString()
    };

    await storage.append('measurements', record);

    res.status(201).json({
      success: true,
      message: 'Bespoke measurement sheet recorded successfully.',
      data: record
    });
  } catch (err) {
    next(err);
  }
};

export const getMeasurements = async (req, res, next) => {
  try {
    const records = await storage.read('measurements', []);
    res.json({
      success: true,
      count: records.length,
      data: records
    });
  } catch (err) {
    next(err);
  }
};
