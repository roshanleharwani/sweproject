import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Use Number for numerical values
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  rating: {
    type: Number, // Use Number for ratings
    required: true,
  },
  qty: {
    type: Number, // Use Number for quantity
    required: true,
  },
});

export default mongoose.models.Book || mongoose.model('Book', BookSchema);
