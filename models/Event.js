const mongoose = require('mongoose');

const eventsSchema = new mongoose.Schema({
  event_name: String,
  venue_id: String,
  event_date: String,
  event_description: String,
});

module.exports = mongoose.model('Events', eventsSchema);