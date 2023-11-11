const mongoose = require('mongoose');

const categoriesSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model('Categories', categoriesSchema);