const port = process.env.PORT || 4000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/iRecommend';
const secret = '+xens#,]{)h34aV&';
const yandexKey = process.env.YANDEX_API_KEY;
const oandaKey = process.env.OANDA_API_KEY;

module.exports = { port, dbURI, secret, yandexKey, oandaKey };
