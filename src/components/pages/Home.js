import React from 'react';
import axios from 'axios';

import HomeMap from '../common/HomeMap';
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
        <Autocomplete types={['(cities)']} onPlaceSelected={this.handleSelection} className="input" placeholder="Search a city..."/>
        <p>{this.state.message}</p>
        {this.state.cities && <HomeMap selection={this.handleSelection} countries={this.state.cities} cities={this.state.cities} />}
      </main>
    );
  }
}

export default Home;
