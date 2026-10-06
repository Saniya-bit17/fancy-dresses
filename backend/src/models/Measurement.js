import mongoose from 'mongoose';

const measurementSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    reference: { type: String, required: true, unique: true, index: true },
    clientName: { type: String, default: 'Private Client' },
    email: { type: String, index: true },
    dressId: { type: String, default: 'general' },
    measurements: {
      bust: { type: Number, default: null },
      waist: { type: Number, default: null },
      hip: { type: Number, default: null },
      height: { type: Number, default: null },
      highBust: { type: Number, default: null },
      underBust: { type: Number, default: null },
      acrossBack: { type: Number, default: null },
      hollowToHem: { type: Number, default: null }
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

export const Measurement = mongoose.model('Measurement', measurementSchema);
export default Measurement;
