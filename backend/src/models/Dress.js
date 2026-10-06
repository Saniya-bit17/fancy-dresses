import mongoose from 'mongoose';

const dressSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    priceFormatted: { type: String },
    category: { type: String, required: true, index: true },
    tag: { type: String },
    silhouette: { type: String },
    leadTime: { type: String },
    fabrics: [{ type: String }],
    artStroke: { type: String },
    artFill: { type: String },
    description: { type: String },
    craftDetails: { type: String },
    occasion: [{ type: String }],
    inStockToile: { type: Boolean, default: true }
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

export const Dress = mongoose.model('Dress', dressSchema);
export default Dress;
