# ![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) WDI 34 Project 4
## iRecommend

This app is a full MERN stack app. I created this app so people would be able to view recommendations, written by people they trust, for cities around the world. I created my own API as well as using third party APIs.

#### Technologies Used
HTML | SCSS | JavaScript (ES6) | MongoDB | Express.js | React | Node.js | Webpack | Mongoose | [Draw.io](https://www.draw.io) | [Trello](https://trello.com)

#### APIs Used
[Google Maps](https://developers.google.com/maps/documentation/javascript/tutorial) | [Google Place Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) | [Google Places](https://developers.google.com/places/web-service/intro) | [Rest Countries](https://restcountries.eu/) | [Oanda](https://developer.oanda.com/) | [Yandex](https://translate.yandex.com/developers)

This app is deployed on [Heroku](https://i-recommend.herokuapp.com/).

***

### The Planning Process
I used [Draw.io](https://www.draw.io) to mock up my wireframes to help me envisage what my app would look like and to map out all the different pages. I also used [Trello](https://trello.com) to organise what I needed to do and
#### Wireframes
<p align="center"><img src="https://imgur.com/0z1Evex.png" width="500"></p>

### The App

<p align="center"><img src="https://i.imgur.com/beV71rw.png" width="700"></p>

#### Searching For a City

The user is initially presented with the homepage of a world map. The markers represent all the cities currently with recommendations. When more recommendations are added to the database in different cities, markers are added accordingly. I wanted to make it so the user is either able to view the map, have a play around, and select a city by clicking on its marker or by simply searching a city in the search bar. Once the city is chosen, the user is taken to the specific page for that city where they can read the recommendations.

#### Viewing a City
<p align="center"><img src="https://imgur.com/88FwznZ.png" width="700"></p>

For each city page I wanted to give the user some information about that city, including currency, exchange rate and a welcoming 'hello' translated into the local language.

To implement these three features I used [Rest Countries API](https://restcountries.eu/) to first retrieve the currency symbol and code as well as the language code. Once I had these, I could then use [Oanda API](https://developer.oanda.com/) and [Yandex API](https://translate.yandex.com/developers) to get the exchange rate and 'hello' translation, respectively.

I made these requests in my 'city model' with a 'pre-save hook' (as shown below) so that when a city was created it would only have to make these requests once and then assign them to that city, instead of making multiple requests every time a city page is loaded.

```
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
        this.countryLocation.lat = response[0].latlng[0];
        this.countryLocation.lng = response[0].latlng[1];
      })
      .then(() => {
        return rp({
          url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
          method: 'POST',
          qs: {
            text: 'Hello',
            lang: `en-${this.languageCode}`,
            key: yandexKey
          }
        })
          .then(res => {
            const response = JSON.parse(res);
            this.localHello = response.text[0];
          });
      })
      .then(() => {
        return rp({
          url: 'https://web-services.oanda.com/rates/api/v2/rates/spot.json',
          method: 'GET',
          qs: {
            api_key: oandaKey,
            base: 'GBP',
            quote: this.currencyCode
          }
        })
          .then(res => {
            const response = JSON.parse(res);
            this.exchangeRate = response.quotes[0].midpoint;
            done();
          });
      });
  }
  done();
});
```


#### Viewing the Recommendations
<p align="center"><img src="https://imgur.com/86GBoLn.png" width="700"></p>


Further down the page all the recommendations are listed for the chosen city. Using [Google Places API](https://developers.google.com/places/web-service/intro), I extracted the location, price level and opening hours for each recommendation, to give the viewer some more information. The idea was that I wanted this app to give recommendations from people that you know and trust, therefore created a feature that would filter down the recommendations for each city to just the ones written by people you 'follow'. Alongside that, I also created a second filter where the user is able to select the type of place, e.g. restaurant, bar, museum etc.

#### Adding a Recommendation
<p align="center"><img src="https://imgur.com/gAcK94I.png" width="700"></p>


When it came to adding a recommendation, I wanted to keep it simple therefore only created four fields for the user to complete: the city, the place, a comment and a rating. The rest of the information I got from using [Google Place Autocomplete](https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete) and [Google Places API](https://developers.google.com/places/web-service/intro) simultaneously.

I designed the app so that when a new recommendation is added, it would first check to see whether its city is already in the database, before creating a new one. If the city already exists, this step is skipped and the new recommendation is added under the existing city (as shown in my 'create recommendation route' below).

```
function createRoute(req, res, next) {
  req.body.creator = req.currentUser;

  City.findOne({ name: req.body.city.name })
    .then(city => {
      if(city) return city;
      return City.create(req.body.city);
    })
    .then(city => {
      req.body.city = city;

      Recommendation
        .create(req.body)
        .then(recommendation => res.status(201).json(recommendation))
        .catch(next);
    });

}
```

The latitude and longitude of the city and the place were retrieved from [Rest Countries API](https://restcountries.eu/) and [Google Places API](https://developers.google.com/places/web-service/intro), respectively, in order to display the markers on the world map and the individual city maps.

### Challenges

#### Retrieving the Latitudes and Longitudes
A challenge I faced was retrieving the latitude and longitude for both the city and the place with one request, in order to display their markers on both the world map and city map. I was not able to get both with just using Google Places, it would return the city but I would have had to make another request to the Rest Countries API in order to get the city's location. I therefore decided to create another input field for the user to enter the city of where their recommendation was. This creates a slightly lower quality user experience, and therefore, would like to find a way around this in the future.

### Further Additions

#### Push Notifications
Moving forward, I would like to add push notifications to signify users when one of their followees has added a new recommendation.
