import React from 'react';
import axios from 'axios';

class AuthRegister extends React.Component {

  state = {
    errors: {}
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/register', this.state)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="firstName">First Name</label>
          <input className="input" name="firstName" placeholder="First Name" onChange={this.handleChange} />
          {this.state.errors.firstName && <small>{this.state.errors.firstName}</small>}
        </div>
        <div className="field">
          <label className="lastName">Last Name</label>
          <input className="input" name="lastName" placeholder="Last Name" onChange={this.handleChange} />
          {this.state.errors.lastName && <small>{this.state.errors.lastName}</small>}
        </div>
        <div className="field">
          <label className="email">Email</label>
          <input className="input" name="email" placeholder="Email" onChange={this.handleChange} />
          {this.state.errors.email && <small>{this.state.errors.email}</small>}
        </div>
        <div className="field">
          <label className="password">Password</label>
          <input className="input" type="password" name="password" placeholder="Password" onChange={this.handleChange} />
          {this.state.errors.password && <small>{this.state.errors.password}</small>}
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
