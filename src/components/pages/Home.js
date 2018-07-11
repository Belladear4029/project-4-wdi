import React from 'react';
import axios from 'axios';

import GoogleMap from '../common/GoogleMap';
import Autocomplete from 'react-google-autocomplete';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {
      message: ''
    };

    this.handleSelection = this.handleSelection.bind(this);
  }


  componentDidMount() {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }));
  }

  handleSelection(place) {
    this.state.cities.forEach(city => {
      if(city.name === place.name) this.props.history.push(`cities/${city._id}`);
      else(this.setState({ message: 'Sorry, no recommendations for this city currrently!' }));
    });
  }

  render() {
    return (
      <main>
        <h1>Find recommendations</h1>
        <Autocomplete onPlaceSelected={this.handleSelection} className="input" placeholder="Search a city..."/>
        <p>{this.state.message}</p>
        {this.state.cities && <GoogleMap cities={this.state.cities} />}
      </main>
    );
  }
}

export default Home;
