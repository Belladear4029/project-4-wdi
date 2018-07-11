const mongoose = require('mongoose');
require('./recommendation');

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  location: { lat: Number, lng: Number },
  language: String
});

citySchema.virtual('recommendations', {
  localField: '_id',
  foreignField: 'city',
  ref: 'Recommendation'
});

citySchema.set('toJSON', {
  virtuals: true
});

module.exports = mongoose.model('City', citySchema);
