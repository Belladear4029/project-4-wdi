const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema({
  name: String,
  address: String,
  content: String,
  rating: { type: Number, min: 1, max: 5 },
  location: { lat: Number, lng: Number },
  city: { type: mongoose.Schema.ObjectId, ref: 'City'},
  creator: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Recommendation', recommendationSchema);
