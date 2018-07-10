import React from 'react';
import axios from 'axios';

class CitiesShow extends React.Component {

  constructor() {
    super();
    this.state = {
      city: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/cities/${this.props.match.params.id}`)
      .then(res => this.setState({ city: res.data }))
      .then(() => console.log(this.state.city))
      .then(() => console.log(this.state.city.name));
  }

  render() {
    return (
      <div>
        <h1>{this.state.city.name}</h1>
      </div>
    );
  }
}

export default CitiesShow;
