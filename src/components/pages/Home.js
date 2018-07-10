import React from 'react';
import axios from 'axios';

import GoogleMap from '../common/GoogleMap';
import Autocomplete from 'react-google-autocomplete';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }))
      .then(() => console.log(this.state.cities));
  }

  handleSelection(place) {
    console.log(place.name);
    console.log(this.state.cities);
    // this.state.cities.forEach(city => {
    //   if(city.name === place.name) this.props.history.push(`cities/${city._id}`);
    // });
  }

  render() {
    return (
      <main>
        <h1>Find recommendations</h1>
        <Autocomplete onPlaceSelected={this.handleSelection} className="input" placeholder="Search a Country or City..."/>
        {this.state.cities && <GoogleMap cities={this.state.cities} />}
      </main>
    );
  }
}

export default Home;
