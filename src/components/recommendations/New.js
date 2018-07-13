import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import RecommendationsForm from './Form';

class RecommendationsNew extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: '/api/recommendations',
      method: 'POST',
      data: this.state,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const currentUser = Auth.getCurrentUser();
        console.log(currentUser);
        this.props.history.push(`/users/${Auth.getPayload().sub}`);
      });
  }

  handleCitySelection = (city) => {
    console.log(city);
    this.setState({
      city: {
        name: city.name,
        country: city.address_components[city.address_components.length-1].long_name,
        location: city.geometry.location
      }
    });
  }

  handlePlaceSelection = (place) => {
    console.log(place);
    this.setState({
      name: place.name,
      address: place.formatted_address,
      location: place.geometry.location,
      openingHours: place.opening_hours.weekday_text,
      priceLevel: place.price_level,
      types: place.types
    });
  }

  render() {
    return (
      <RecommendationsForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        handleCitySelection={this.handleCitySelection}
        handlePlaceSelection={this.handlePlaceSelection}
        data={this.state}
      />
    );
  }
}

export default RecommendationsNew;
