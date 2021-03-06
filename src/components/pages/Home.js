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
    this.state.cities.forEach(city => {
      if(place.name === city.name) this.props.history.push(`cities/${city._id}`);
      else (this.setState({ message: 'Sorry, no recommendations for this city currrently!' }));
    });
  }

  render() {
    return (
      <main className="main-homepage">
        <h1 className="title home is-3 is-centered">Search or select a city to find the recommendations for you.</h1>
        <Autocomplete types={['(cities)']} onPlaceSelected={this.handleSelection} className="input home" placeholder="Search a city..."/>
        <h1 className="title is-4 is-centered">{this.state.message}</h1>
        {this.state.cities && <HomeMap selection={this.handleSelection} countries={this.state.cities} cities={this.state.cities} countryLocation={this.state.countryLocation}/>}
      </main>
    );
  }
}

export default Home;
