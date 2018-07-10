import React from 'react';
import axios from 'axios';

import GoogleMap from '../common/GoogleMap';
import GoogleAutocomplete from '../common/GoogleAutocomplete';

class Home extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get('/api/cities')
      .then(res => this.setState({ cities: res.data }));
  }

  render() {
    return (
      <main>
        <h1>Find recommendations</h1>
        <GoogleAutocomplete placeholder="Search a Country or City..."/>
        {this.state.cities && <GoogleMap cities={this.state.cities} />}
      </main>
    );
  }
}

export default Home;
