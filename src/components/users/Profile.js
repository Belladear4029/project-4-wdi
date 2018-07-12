import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class UsersProfile extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {

    axios({
      url: '/api/currentUser',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }));
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.currentUser) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <img src={this.state.currentUser.image} />
          <h1 className="title is-2">{this.state.currentUser.firstName} {this.state.currentUser.lastName}</h1>
          <Link to={`/users/${this.state.currentUser._id}/edit`}>Edit Profile</Link>
        </div>
        <div className="column is-half-desktop">
          <p className="title is-5">{this.state.currentUser.followers.length} followers</p>
          <p className="title is-5">{this.state.currentUser.following.length} following</p>
          <p className="title is-5">{this.state.currentUser.recommendations.length} recommendations</p>
        </div>
        <div className="column is-full-desktop">
          <p className="title is-5">Recommendations</p>
          {this.state.currentUser.recommendations.map(recommendation =>
            <div key={recommendation._id}>
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title is-3"><Link to={`/cities/${recommendation.city._id}`}>{recommendation.city.name}</Link> - {recommendation.name}</p>
                  <h1 className="card-header-icon title is-6">Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">{recommendation.address}</h1>
                  <h1 className="title is-6">{recommendation.content}</h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default UsersProfile;
