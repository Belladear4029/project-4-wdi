import React from 'react';
import axios from 'axios';
import GoogleAutocomplete from '../common/GoogleAutocomplete';

class RecommendationsNew extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/recommendations', this.state)
      .then(() => {
        this.props.history.push('/users');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="place">Place</label>
          <GoogleAutocomplete onPlaceSelected={place => console.log(place)} placeholder="Search for your recommended place"/>
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
