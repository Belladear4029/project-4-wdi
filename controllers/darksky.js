const rp = require('request-promise');

function forecast(req, res, next) {
  rp({
    method: 'GET',
    url: `https://api.darksky.net/forecast/9700aa447aa91f838a68d4ccdff1ea7d/${req.query.lat},${req.query.lng}`,
    json: true
  })
    .then(response => res.json(response))
    .catch(next);
}

module.exports = {
  forecast
};
