import React from 'react';
import axios from 'axios';

import Auth from '../../lib/Auth';

class AuthLogin extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/login', this.state)
      .then(res => {
        Auth.setToken(res.data.token);
        Auth.setCurrentUser(res.data.user);
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field login">
          <label className="email">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="password">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default AuthLogin;
