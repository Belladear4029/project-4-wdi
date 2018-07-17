import React from 'react';
import axios from 'axios';

import HomeMap from '../common/HomeMap';
import Autocomplete from 'react-google-autocomplete';

class Home extends React.Component {

  state = {
    message: ''
  };

  componentDidMount = () => {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }));
  }

  handleSelection = (place) => {
    const zoom = this.props.zoom;
    this.state.cities.forEach(city => {
      if(place.name === city.country) zoom(city.countryLocation);
      if(place.name === city.name) this.props.history.push(`cities/${city._id}`);
      else(this.setState({ message: 'Sorry, no recommendations for this place currrently!' }));
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
        {this.state.cities && <HomeMap selection={this.handleSelection} zoom={this.zoomMap} countries={this.state.cities} cities={this.state.cities} />}
      </main>
    );
  }
}

export default Home;
