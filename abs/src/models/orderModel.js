const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  products: [{
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products',
      required: true
    },
    name: String,
    quantity: {
      type: Number,
      required: true
    },
    price: Number
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
