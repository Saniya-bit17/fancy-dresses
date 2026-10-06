import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    reference: { type: String, required: true, unique: true, index: true },
    inquiryType: { type: String, default: 'bespoke' }, // bespoke, swatch, alterations
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    phone: { type: String, default: '' },
    message: { type: String, required: true },
    status: { type: String, default: 'pending', index: true },
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

export const Inquiry = mongoose.model('Inquiry', inquirySchema);
export default Inquiry;
