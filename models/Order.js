const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  user_id: String,
  order_date: String,
  total_price: Number
});

module.exports = mongoose.model('Orders', ordersSchema);