import React from 'react';
import axios from 'axios';

// import GoogleAutocomplete from '../common/GoogleAutocomplete';
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

  handleSelection = (place) => {
    console.log(place);
    this.setState({
      name: place.name,
      address: place.formatted_address
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="place">Place</label>
          <Autocomplete types={['establishment']} className="input" onPlaceSelected={this.handleSelection} placeholder="Search for your recommended place" />
        </div>
        <div className="field">
          <label className="content">Content</label>
          <input className="input" name="content" placeholder="Content" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="rating">Rating</label>
          <input className="input" name="rating" placeholder="Rating" onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default RecommendationsNew;
