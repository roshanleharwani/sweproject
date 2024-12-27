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
    },
  ],
});

export default mongoose.models.UserOrders || mongoose.model('UserOrders', userOrdersSchema);



