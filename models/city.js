const mongoose = require('mongoose');
const rp = require('request-promise');
require('./recommendation');

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  location: { lat: Number, lng: Number },
  language: String,
  languageCode: String,
  currency: String,
  currencyCode: String,
  localHello: String
});

citySchema.virtual('recommendations', {
  localField: '_id',
  foreignField: 'city',
  ref: 'Recommendation'
});

citySchema.set('toJSON', {
  virtuals: true
});

citySchema.pre('save', function getHello(done) {
  if(this.isModified('name')) {
    return rp({
      url: `https://restcountries.eu/rest/v2/name/${this.country}`,
      method: 'GET'
    })
      .then(res => {
        const response = JSON.parse(res);
        this.langauge = response[0].languages[0].name;
        this.languageCode = response[0].languages[0].iso639_1;
        this.currency = response[0].currencies[0].symbol;
        this.currencyCode = response[0].currencies[0].code;
      })
      .then(() => {
        return rp({
          url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
          method: 'POST',
          qs: {
            text: 'Hello',
            lang: `en-${this.languageCode}`,
            key: 'trnsl.1.1.20180716T095741Z.f982ee44e7d27963.471499f1b65d4a15b86c29c5c75bd2654d82a0c1'
          }
        })
          .then(res => {
            const response = JSON.parse(res);
            this.localHello = response.text[0];
            done();
          });
      });
  }
  done();
});

module.exports = mongoose.model('City', citySchema);
