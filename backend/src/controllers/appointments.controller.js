import crypto from 'crypto';
import { storage } from '../services/storage.service.js';

export const createAppointment = async (req, res, next) => {
  try {
    const {
      location = 'jaipur',
      dress = 'The Solène Gown',
      date,
      timeSlot = '11:00 AM - 12:30 PM',
      fullName,
      email,
      phone,
      eventDate,
      notes = ''
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Client full name, email address, and phone number are required.'
      });
    }

    // Generate bespoke reference code, e.g. MS-2026-A8F2
    const randomSuffix = crypto.randomBytes(2).toString('hex').toUpperCase();
    const reference = `MS-2026-${randomSuffix}`;

    const newAppointment = {
      id: crypto.randomUUID(),
      reference,
      location, // jaipur, delhi, virtual
      dress,
      date: date || 'Flexible / To be confirmed',
      timeSlot,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      eventDate: eventDate || null,
      notes: notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    await storage.append('appointments', newAppointment);

    res.status(201).json({
      success: true,
      message: 'Bespoke fitting consultation registered successfully.',
      data: newAppointment
    });
  } catch (err) {
    next(err);
  }
};

export const getAppointments = async (req, res, next) => {
  try {
    let appointments = await storage.read('appointments', []);
    const { location, status } = req.query;

    if (location) {
      appointments = appointments.filter((a) => a.location && a.location.toLowerCase() === location.toLowerCase());
    }

    if (status) {
      appointments = appointments.filter((a) => a.status && a.status.toLowerCase() === status.toLowerCase());
    }

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (err) {
    next(err);
  }
};

export const getAppointmentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const appointment = await storage.findById('appointments', id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: `Appointment '${id}' not found.`
      });
    }

    res.json({
      success: true,
      data: appointment
    });
  } catch (err) {
    next(err);
  }
};

export const updateAppointmentStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['confirmed', 'toile_in_progress', 'fitting_completed', 'rescheduled', 'cancelled'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`
      });
    }

    const updated = await storage.updateById('appointments', id, {
      ...(status && { status }),
      ...(notes && { notes })
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Appointment '${id}' not found.`
      });
    }

    res.json({
      success: true,
      message: 'Appointment status updated.',
      data: updated
    });
  } catch (err) {
    next(err);
  }
};
