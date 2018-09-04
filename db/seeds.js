const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const  { dbURI } = require('../config/environment');

const City = require('../models/city');
const User = require('../models/user');
const Recommendation = require('../models/recommendation');

mongoose.connect(dbURI, { useNewUrlParser: true }, (err, db) => {
  db.dropDatabase()
    .then(() => {
      return User.create([{
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
        image: 'https://imgur.com/jHu8V3j.png',
        email: 'james@james.com',
        password: 'james',
        passwordConfirmation: 'james'
      }, {
        firstName: 'Bianca',
        lastName: 'Jemsten',
        image: 'https://imgur.com/5pcLX9p.png',
        email: 'bianca@bianca.com',
        password: 'bianca',
        passwordConfirmation: 'bianca'
      }]);

    })
    .then(users => {
      console.log(`${users.length} users created`);
      return City.create([{
        name: 'Barcelona',
        country: 'Spain',
        location: { lat: 41.3851, lng: 2.1734 }
      }, {
        name: 'Prague',
        country: 'Czech Republic',
        location: { lat: 50.0755, lng: 14.4378 }
      }, {
        name: 'Paris',
        country: 'France',
        location: { lat: 48.8566, lng: 2.3522 }
      }, {
        name: 'Beunos Aires',
        country: 'Argentina',
        location: {lat: -34.60368440000001, lng: -58.381559100000004}
      }])
        .then(cities => {
          console.log(`${cities.length} cities created`);
          return Recommendation.create([{
            name: 'Bobby\'s Free',
            address: 'Calle Pau Claris 85, 08010',
            content: 'Really nice place',
            rating: 4.5,
            location: { lat: 41.389856, lng: 2.170753 },
            priceLevel: 3,
            types: ['bar'],
            city: cities[0],
            creator: users[0]
          }, {
            name: 'Museum of Modernism',
            address: '48 Balmes Street, 08007',
            content: 'Fascinating museum',
            rating: 4.2,
            location: { lat: 41.388947, lng: 2.163636 },
            priceLevel: 2,
            types: ['museum'],
            city: cities[0],
            creator: users[1]
          }, {
            name: 'Old Town Square',
            address: 'Stare Mesto, 110 00',
            content: 'The most significant square of historical Prague, it was founded in the 12th century and has been witness to many historical events',
            rating: 4,
            location: { lat: 50.089438, lng: 14.419407 },
            city: cities[1],
            creator: users[2]
          }, {
            name: 'Portfolio Restaurant',
            address: 'Havlíčkova 1030/1, 110 00 Nové Město',
            content: 'This place is so yummy and really nice cocktails!',
            rating: 4.5,
            location: { lat: 50.087516, lng: 14.432376 },
            priceLevel: 2,
            types: ['restaurant'],
            city: cities[1],
            creator: users[0]
          }, {
            name: 'Le Syndicat',
            address: '51 Rue du Faubourg Saint-Denis, 75010',
            content: 'This bar is really cool, couldn\'t recommend it more!',
            rating: 4.7,
            location: { lat: 48.871833, lng: 2.353629 },
            priceLevel: 1,
            types: ['bar'],
            city: cities[2],
            creator: users[3]
          }, {
            name: 'Maman Fine Art',
            address: 'Av. del Libertador 2475, 1425AAK CABA',
            content: 'Great art gallery!',
            rating: 4.7,
            location: {lat: -34.5788103, lng: -58.406521999999995},
            priceLevel: 1,
            types: ['musuem'],
            city: cities[3],
            creator: users[3]
          }, {
            name: 'Le Brun',
            address: '95 Rue Saint Honoré, 75001 Paris, France',
            content: 'Nice, cool spot on a hot day and much better bet than the overcrowded pavement cafes. The service was really good and I had lovely food and wine.',
            rating: 4.3,
            location: {lat: 48.8613022, lng: 2.343203000000017},
            openingHours: ['Monday: 11:30 AM – 11:00 PM', 'Tuesday: 11:30 AM – 11:00 PM', 'Wednesday: 11:30 AM – 11:00 PM', 'Thursday: 11:30 AM – 11:00 PM', 'Friday: 11:30 AM – 11:00 PM', 'Saturday: 11:30 AM – 11:00 PM', 'Sunday: Closed'],
            priceLevel: 2,
            types: ['restaurant'],
            city: cities[2],
            creator: users[1]
          }, {
            name: 'Musée de la Musique',
            address: '95 Rue Saint Honoré, 75001 Paris, France',
            content: ' This is a must for music lovers. A basic knowledge of French helps your understanding of titles but is not really necessary if you know what you are looking at.',
            rating: 5,
            location: {lat: 48.8899426, lng: 2.3936138000000255},
            openingHours: ['Monday: 12:00 – 6:00 PM', 'Tuesday: 12:00 – 6:00 PM', 'Wednesday: 12:00 – 6:00 PM', 'Thursday: 12:00 – 6:00 PM', 'Friday: 12:00 – 6:00 PM', 'Saturday: 10:00 AM – 6:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
            priceLevel: 1,
            types: ['museum'],
            city: cities[2],
            creator: users[2]
          }, {
            name: 'Musée Jacquemart-André',
            address: '158 Boulevard Haussmann, 75008 Paris, France',
            content: ' Housed in a beautiful old mansion just steps from the Champs-Elysees, the Jacquemart-André Museum houses a world-class collection of art, including works by the likes of Rembrandt, Van Dyck, and Boticelli.',
            rating: 4,
            location: {lat: 48.8754479, lng: 2.3105315000000246},
            openingHours: ['Monday: 12:00 – 6:00 PM', 'Tuesday: 12:00 – 6:00 PM', 'Wednesday: 12:00 – 6:00 PM', 'Thursday: 12:00 – 6:00 PM', 'Friday: 12:00 – 6:00 PM', 'Saturday: 10:00 AM – 6:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
            priceLevel: 2,
            types: ['museum'],
            city: cities[2],
            creator: users[1]
          }, {
            name: 'L\'Affineur\'Affiné',
            address: '51 Rue Notre Dame de Lorette, 75009 Paris, France',
            content: 'Been here several times, their plates of 10 chesses are always wonderful, the charcuterie and the wine are good too! Perfect!',
            rating: 4.8,
            location: {lat: 48.87986659999999, lng: 2.335599699999989},
            openingHours: ['Monday: 12:00 – 6:00 PM', 'Tuesday: 12:00 – 6:00 PM', 'Wednesday: 12:00 – 6:00 PM', 'Thursday: 12:00 – 6:00 PM', 'Friday: 12:00 – 6:00 PM', 'Saturday: 10:00 AM – 6:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
            priceLevel: 3,
            types: ['restaurant'],
            city: cities[2],
            creator: users[3]
          }]);
        });
    })
    .then(recommendations => console.log(`${recommendations.length} recommendations created`))
    .catch(err => console.log(err))
    .finally(() => mongoose.connection.close());
});
