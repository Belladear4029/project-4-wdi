const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iRecommend';
const secret = '+xens#,]{)h34aV&';
const yandexKey = process.env.YANDEX_API_KEY;
const oandaKey = 'TkmrkLJaUG8cCtWg2CIxXYta';
console.log(yandexKey);
console.log(oandaKey);

module.exports = { port, dbURI, secret, yandexKey, oandaKey };
