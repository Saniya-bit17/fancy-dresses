import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    reference: { type: String, required: true, unique: true, index: true },
    location: { type: String, required: true }, // jaipur, delhi, virtual
    dress: { type: String, default: 'The Solène Gown' },
    date: { type: String, default: 'Flexible / To be confirmed' },
    timeSlot: { type: String, default: '11:00 AM - 12:30 PM' },
    fullName: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, required: true },
    eventDate: { type: String, default: null },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: ['confirmed', 'toile_in_progress', 'fitting_completed', 'rescheduled', 'cancelled'],
      default: 'confirmed',
      index: true
    },
    createdAt: { type: String }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      }
    }
  }
);

export const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;
