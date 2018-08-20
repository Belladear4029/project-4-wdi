# ![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) WDI 34 Project 4
## iRecommend

This app is a full MERN stack app. I created this app so people would be able to view recommendations written by people they trust for cities around the world. For each city I added more information, displaying the currency and the currency rate using [Rest Countries API](https://restcountries.eu/) and [Oanda API](https://developer.oanda.com/) respectively.
Using [Yandex API](https://translate.yandex.com/developers) a translation of 'hello' is displayed for each city in the local language.

**Technologies used:** HTML, SCSS, JavaScript, MongoDB, Express.js, React, Node.js and Webpack.

This app is deployed on [Heroku](https://iRecommend.herokuapp.com/).

### The App

<p align="center"><img src="https://i.imgur.com/beV71rw.png" width="700"></p>

#### Searching For a City

The user is initially presented with the homepage of a world map. The markers represent all the cities currently with recommendations. When more recommendations are added to the database in different cities, markers are added accordingly. I wanted to make it so the user is either able to view the map, have a play around and select a city by clicking on its marker or by simply searching a city in the search bar. Once the city is chosen, the user is taken to the specific page with the recommendations for that city.

#### Viewing a City
<p align="center"><img src="https://imgur.com/88FwznZ.png" width="700"></p>


#### Viewing the Recommendations
<p align="center"><img src="https://imgur.com/86GBoLn.png" width="700"></p>


Further down the page all the recommendations are listed for the chosen city. Using [Google Places API](https://developers.google.com/places/web-service/intro), I extracted the location, price level and opening hours for each recommendation, to give the viewer some more information. The idea was that I wanted this app to give recommendations from people that you know and trust, therefore created a feature that would filter down the recommendations for each city to just the ones written by people you 'follow'. Alongside that, I also created a second filter where the user is able to select the type of place, e.g. restaurant, bar, museum etc.

#### Adding a Recommendation
<p align="center"><img src="https://imgur.com/gAcK94I.png" width="700"></p>


When it came to adding a recommendation, I wanted to keep it simple therefore only created four fields for the user to complete: the city, the place, a comment and a rating. The rest of the information I got from using Google Autocomplete and [Google Places API](https://developers.google.com/places/web-service/intro) simultaneously.

I designed the app so that when a new recommendation is added, it would first check to see whether its city is already in the database, before creating a new one. If the city already exists, this step is skipped and the new recommendation is added under the existing city, as shown in my create recommendation route below.

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

Pre save hook in the city model - currency code, language code, exchange rate, translate

### Challenges

#### Retrieving the Latitudes and Longitudes
had to enter both city and place as unable to get city lat and lng with google places.

### Further Additions

#### Push Notifications
Gives you notification when a followee adds a recommendation of interest
