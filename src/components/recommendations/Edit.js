import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';
import RecommendationsForm from './Form';

class RecommendationsNew extends React.Component {

  state = {
    city: {},
    errors: {}
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  componentDidMount() {
    axios({
      url: `/api/recommendations/${this.props.match.params.id}`,
      method: 'GET'
    })
      .then(res => this.setState(res.data))
      .then(() => console.log(this.state.city.name));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `/api/recommendations/${this.props.match.params.id}`,
      method: 'PUT',
      data: this.state,
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.push(`/users/${Auth.getCurrentUser()._id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <RecommendationsForm
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        data={this.state}
      />
    );
  }
}

export default RecommendationsNew;
