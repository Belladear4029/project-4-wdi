import React from 'react';
import axios from 'axios';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => console.log(this.state.user.firstName));
  }

  render() {
    return (
      <div>
        <img src={this.state.user.image} />
        <h1>{this.state.user.firstName}</h1>
      </div>
    );
  }
}

export default UsersShow;
