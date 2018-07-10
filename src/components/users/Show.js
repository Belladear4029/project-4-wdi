import React from 'react';
import axios from 'axios';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => this.setState({ error: err.message }));
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <img src={this.state.user.image} />
          <h1 className="title is-2">{this.state.user.firstName} {this.state.user.lastName}</h1>
        </div>
        <div className="column is-half-desktop">
          <p className="title is-5">{this.state.user.followers} followers</p>
          <p className="title is-5">{this.state.user.following} following</p>
        </div>
        <div className="column is-full-desktop">
          <p className="title is-5">Recommendations</p>
        </div>
      </div>
    );
  }
}

export default UsersShow;
