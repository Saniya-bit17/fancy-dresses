import crypto from 'crypto';
import { storage } from '../services/storage.service.js';

export const createInquiry = async (req, res, next) => {
  try {
    const { inquiryType = 'bespoke', name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email address, and message are required.'
      });
    }

    const newInquiry = {
      id: crypto.randomUUID(),
      reference: `INQ-${crypto.randomBytes(2).toString('hex').toUpperCase()}`,
      inquiryType, // bespoke, swatch, alterations
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: (phone || '').trim(),
      message: message.trim(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    await storage.append('inquiries', newInquiry);

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been received by our atelier concierge.',
      data: newInquiry
    });
  } catch (err) {
    next(err);
  }
};

export const getInquiries = async (req, res, next) => {
  try {
    const inquiries = await storage.read('inquiries', []);
    res.json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });
  } catch (err) {
    next(err);
  }
};

export const subscribeNewsletter = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        success: false,
        message: 'A valid email address is required.'
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const list = await storage.read('newsletter', []);
    const existing = list.find((item) => item.email === cleanEmail);

    if (existing) {
      return res.json({
        success: true,
        message: 'You are already registered for atelier consultations and lookbook previews.',
        data: existing
      });
    }

    const entry = {
      id: crypto.randomUUID(),
      email: cleanEmail,
      subscribedAt: new Date().toISOString()
    };

    await storage.append('newsletter', entry);

    res.status(201).json({
      success: true,
      message: 'Consultation invitation dispatched. Welcome to Maison Solène.',
      data: entry
    });
  } catch (err) {
    next(err);
  }
};
