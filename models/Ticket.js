const mongoose = require('mongoose');

const ticketsSchema = new mongoose.Schema({
  event_id: String,
  price: Number,
  available: String,
  seat_number: String
});

module.exports = mongoose.model('Ticket', ticketsSchema);