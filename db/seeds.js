const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const  { dbURI } = require('../config/environment');

const City = require('../models/city');

mongoose.connect(dbURI, { useNewUrlParser: true }, (err, db) => {
  db.dropDatabase()
    .then(() => City.create([{
      name: 'Barcelona',
      country: 'Spain',
      language: 'Spanish'
    }, {
      name: 'Prague',
      country: 'Czech Republic',
      language: 'Czech'
    }, {
      name: 'Paris',
      country: 'France',
      language: 'French'
    }]));

});
