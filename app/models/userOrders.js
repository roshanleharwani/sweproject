import mongoose from 'mongoose';

const userOrdersSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  payment:{
    type: String,
    required: true,
  },
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      bookId:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Book',
        }
    },
  ],
  address: {
    name:{
      type: String,
      required: true,
    },
    address:{
      type: String,
      required: true,
    },
    city:{
      type: String,
      required: true,
    },
    state:{
      type: String,
      required: true,
    },
    zip:{
      type: String,
      required: true,
    },
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

export default mongoose.models.UserOrders || mongoose.model('UserOrders', userOrdersSchema);



