import React from 'react';
import axios from 'axios';

import Autocomplete from 'react-google-autocomplete';
import Auth from '../../lib/Auth';

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
        this.props.history.push('/users');
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
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="city">City</label>
          <Autocomplete types={['(cities)']} className="input" onPlaceSelected={this.handleCitySelection} placeholder="Search a city" />
        </div>
        <div className="field">
          <label className="place">Place</label>
          <Autocomplete types={['establishment']} className="input" onPlaceSelected={this.handlePlaceSelection} placeholder="Search for your recommended place" />
        </div>
        <div className="field">
          <label className="content">Review</label>
          <input className="input" name="content" placeholder="Why do you recommend this?" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="rating">Rating</label>
          <input className="input" name="rating" placeholder="On a scale of 1 to 5" onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default RecommendationsNew;
