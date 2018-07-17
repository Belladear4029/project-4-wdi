import React from 'react';
import axios from 'axios';

import HomeMap from '../common/HomeMap';
import Autocomplete from 'react-google-autocomplete';

class Home extends React.Component {

  state = {
    message: '',
    location: ''
  };

  componentDidMount = () => {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }));
  }

  handleSelection = (place) => {
    console.log(place.name);
    this.state.cities.forEach(city => {
      if(place.name === city.country) this.setState({ location: city.countryLocation });
      if(place.name === city.name) this.props.history.push(`cities/${city._id}`);
      else (this.setState({ message: 'Sorry, no recommendations for this place currrently!' }));
    });
  }

  zoomMap = (map, location) => {
    map.setZoom(8);
    map.setCenter(location);
  }

  render() {
    return (
      <main>
        <h1 className="title home is-3 is-centered">Search or select a city to find the recommendations for you.</h1>
        <Autocomplete types={['geocode']} onPlaceSelected={this.handleSelection} className="input home" placeholder="Search a city..."/>
        <p>{this.state.message}</p>
        {this.state.cities && <HomeMap selection={this.handleSelection} countries={this.state.cities} cities={this.state.cities} location={this.state.location}/>}
      </main>
    );
  }
}

export default Home;
