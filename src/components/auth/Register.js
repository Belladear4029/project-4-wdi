import React from 'react';
import axios from 'axios';

class AuthRegister extends React.Component {

  state = {}

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(() => {
        this.props.history.push('/login');
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="firstName">First Name</label>
          <input className="input" name="firstName" placeholder="First Name" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="lastName">Last Name</label>
          <input className="input" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="email">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="password">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="passwordConfirmation">Password Confirmation</label>
          <input className="input" type="password" name="passwordConfirmation" placeholder="Password Confirmation" onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default AuthRegister;
