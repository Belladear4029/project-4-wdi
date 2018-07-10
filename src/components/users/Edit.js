import React from 'react';
import axios from 'axios';

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
    axios.put(`/api/users/${this.props.match.params.id}`, this.state)
      .then(() => {
        this.props.history.push(`/users/${this.props.match.params.id}`);
      });
  }

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <div className="field">
          <label className="firstName">First Name</label>
          <input className="input" name="firstName" placeholder="First Name" value={this.state.firstName || ''} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="lastName">Last Name</label>
          <input className="input" name="lastName" placeholder="Last Name" value={this.state.lastName || ''} onChange={this.handleChange} />
        </div>
        <div className="field">
          <label className="image">Image</label>
          <input className="input" name="image" placeholder="Image" value={this.state.image || ''} onChange={this.handleChange} />
        </div>

        <button className="button">Submit</button>
      </form>
    );
  }
}

export default UsersEdit;
