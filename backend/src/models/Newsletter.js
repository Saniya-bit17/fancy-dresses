import mongoose from 'mongoose';

const newsletterSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    subscribedAt: { type: String }
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

export const Newsletter = mongoose.model('Newsletter', newsletterSchema);
export default Newsletter;
