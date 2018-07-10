const mongoose = require('mongoose');

const recommondationSchema = new mongoose.Schema({
  name: String,
  address: String,
  rating: { type: Number, min: 1, max: 5 },
  location: { lat: Number, lng: Number },
  city: { type: mongoose.Schema.ObjectId, ref: 'City', required: true },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  language: String,
  recommondations: [recommondationSchema]
});

module.exports = mongoose.model('City', citySchema);
