import mongoose from 'mongoose';

const UserWishlist = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: Number, 
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  dateAdded: {
    type: String, 
    required: true,
  },
  stock:{
    type: String,
    required: true,
  },
  user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
}


});

export default mongoose.models.UserWishlist || mongoose.model('UserWishlist', UserWishlist);

