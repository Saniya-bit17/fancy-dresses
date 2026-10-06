import mongoose from 'mongoose';

const salonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true }
}, { _id: false });

const statSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true }
}, { _id: false });

const craftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
}, { _id: false });

const atelierSchema = new mongoose.Schema(
  {
    established: { type: Number, default: 1998 },
    yearsOfTailoring: { type: Number, default: 27 },
    artisansInHouse: { type: Number, default: 9 },
    fittingsPerGown: { type: Number, default: 3 },
    salons: [salonSchema],
    stats: [statSchema],
    crafts: [craftSchema]
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

export const Atelier = mongoose.model('Atelier', atelierSchema);
export default Atelier;
