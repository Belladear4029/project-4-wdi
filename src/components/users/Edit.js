import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class UsersEdit extends React.Component {

  state = {}

  componentDidMount(){
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/users/${this.props.match.params.id}`, this.state, { Authorization: `Bearer ${Auth.getToken()}` })
      .then(() => {
        this.props.history.push(`/users/${this.props.match.params.id}`);
      });
  }

  render() {
    return (
      <div>
        <img className="user-image edit" src={this.state.image} alt={this.state.firstName} />
        <form onSubmit={this.handleSubmit}>
          <div className="name-input">
            <div className="field">
              <label className="firstName">First Name</label>
              <input className="input" name="firstName" placeholder="First Name" value={this.state.firstName || ''} onChange={this.handleChange} />
            </div>
            <div className="field">
              <label className="lastName">Last Name</label>
              <input className="input lastName" name="lastName" placeholder="Last Name" value={this.state.lastName || ''} onChange={this.handleChange} />
            </div>
          </div>
          <div className="field">
            <label className="email">Email</label>
            <input className="input" name="email" placeholder="Email" value={this.state.email || ''} onChange={this.handleChange} />
          </div>
          <div className="field">
            <label className="image">Image</label>
            <input className="input" name="image" placeholder="Image" value={this.state.image || ''} onChange={this.handleChange} />
          </div>

          <button className="button submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default UsersEdit;
