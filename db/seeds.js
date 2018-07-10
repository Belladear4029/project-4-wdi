const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const  { dbURI } = require('../config/environment');

const City = require('../models/city');
const User = require('../models/user');

mongoose.connect(dbURI, { useNewUrlParser: true }, (err, db) => {
  db.dropDatabase();

  User.create([{
    firstName: 'Bella',
    lastName: 'Dear',
    image: 'https://media.licdn.com/dms/image/C5603AQFDdL6vOSb3MQ/profile-displayphoto-shrink_200_200/0?e=1536796800&v=beta&t=GVJ-vx4KRpHOZEUqOYb9ID3VOV6lTCtFHJpdXu-oEGo',
    email: 'bella@bella.com',
    password: 'bella',
    passwordConfirmation: 'bella'
  }, {
    firstName: 'Josh',
    lastName: 'Storm',
    image: 'https://ga-core.s3.amazonaws.com/production/uploads/instructor/image/1554/thumb_Gerry_2_240x240.jpg',
    email: 'josh@josh.com',
    password: 'josh',
    passwordConfirmation: 'josh'
  }, {
    firstName: 'James',
    lastName: 'Newell',
    image: 'https://media.licdn.com/dms/image/C4D03AQHazaIQs2xaYQ/profile-displayphoto-shrink_200_200/0?e=1535587200&v=beta&t=D57hH_MeggXFnIW7n98oGzfrPcnRfUyKbdFCviN6F9o',
    email: 'james@james.com',
    password: 'james',
    passwordConfirmation: 'james'
  }, {
    firstName: 'Bianca',
    lastName: 'Jemsten',
    image: 'https://media.licdn.com/dms/image/C5603AQGP8ydXXjyNfw/profile-displayphoto-shrink_200_200/0?e=1535587200&v=beta&t=LWRubHnaKF4b7smqh27er3vnUFtcf6UxgwiF7A8sS2A',
    email: 'bianca@bianca.com',
    password: 'bianca',
    passwordConfirmation: 'bianca'
  }])
    .then(users => {
      console.log(`${users.length} users created`);
      return City.create([{
        name: 'Barcelona',
        country: 'Spain',
        location: { lat: 41.3851, lng: 2.1734 },
        language: 'Spanish',
        recommendations: [{
          name: 'Bobby\'s Free',
          address: 'Calle Pau Claris 85, 08010',
          content: 'Really nice place',
          rating: 4.5,
          location: { lat: 41.389856, lng: 2.170753 },
          creator: users[0]
        }, {
          name: 'Museum of Modernism',
          address: '48 Balmes Street, 08007',
          content: 'Fascinating museum',
          rating: 4.2,
          location: { lat: 41.388947, lng: 2.163636 },
          creator: users[1]
        }]
      }, {
        name: 'Prague',
        country: 'Czech Republic',
        language: 'Czech',
        location: { lat: 50.0755, lng: 14.4378 },
        recommendations: [{
          name: 'Old Town Square',
          address: 'Stare Mesto, 110 00',
          content: 'The most significant square of historical Prague, it was founded in the 12th century and has been witness to many historical events',
          rating: 4,
          location: { lat: 50.089438, lng: 14.419407 },
          creator: users[2]
        }, {
          name: 'Portfolio Restaurant',
          address: 'Havlíčkova 1030/1, 110 00 Nové Město',
          content: 'This place is so yummy and really nice cocktails!',
          rating: 4.5,
          location: { lat: 50.087516, lng: 14.432376 },
          creator: users[0]
        }]
      }, {
        name: 'Paris',
        country: 'France',
        location: { lat: 48.8566, lng: 2.3522 },
        language: 'French',
        recommendations: [{
          name: 'Le Syndicat',
          address: '51 Rue du Faubourg Saint-Denis, 75010',
          content: 'This bar is really cool, couldn\'t recommend it more!',
          rating: 4.7,
          location: { lat: 48.871833, lng: 2.353629 },
          creator: users[3]
        }]
      }]);
    })
    .then(cities => console.log(`${cities.length} cities created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
