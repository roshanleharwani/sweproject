import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  bookId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  qty: {
    type: Number, 
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

export default mongoose.models.CartItem || mongoose.model('CartItem', CartItemSchema);
