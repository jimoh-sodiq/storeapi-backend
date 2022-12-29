import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'product name must be provided'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'product name must be provided'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    enum: {
      values: ['ikea', 'liddy', 'marcos', 'caressa'],
      message: '{VALUE} is not supported',
    },
  },
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);
export default Product
