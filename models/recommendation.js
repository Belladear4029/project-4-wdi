const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  name: { type: String, required: 'This field is required' },
  address: String,
  content: { type: String, required: 'This field is required' },
  rating: { type: Number, min: 1, max: 5, required: 'This field is required' },
  location: { lat: Number, lng: Number },
  openingHours: Object,
  priceLevel: Number,
  types: [ String ],
  city: { type: mongoose.Schema.ObjectId, ref: 'City', required: 'This field is required' },
  creator: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
