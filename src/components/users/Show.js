import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {
      follow: false,
      followButton: 'Follow',
      followers: '',
      currentUser: {}
    };

    this.followButton = this.followButton.bind(this);
    this.isCurrentUser = this.isCurrentUser.bind(this);
  }

  componentDidMount() {
    axios({
      url: '/api/profile',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }));
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        if(this.checkIfFollowing()) this.setState({ followButton: 'Unfollow', follow: true });
        this.followersCount();
      })
      .catch(err => this.setState({ error: err.message }));
  }

  checkIfFollowing() {
    if(this.state.currentUser.following){
      const following = this.state.currentUser.following.map(i => i._id);
      return (following.includes(this.state.user._id));
    }
  }

  followersCount() {
    this.setState({ followers: this.state.user.followers.length });
  }

  followButton() {
    this.state.follow ? this.unfollow() : this.follow();
    console.log(this.state.user.followers.length);
  }

  follow() {
    this.setState({ followButton: 'Unfollow', follow: true });
    axios({
      url: `/api/users/${this.props.match.params.id}/follow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.followersCount());
  }

  unfollow() {
    this.setState({ followButton: 'Follow', follow: false });
    axios({
      url: `/api/users/${this.props.match.params.id}/unfollow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    });
  }

  isCurrentUser() {
    if(this.state.user._id === Auth.getPayload().sub) return true;
    else return false;
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <img src={this.state.user.image} />
          <h1 className="title is-2">{this.state.user.firstName} {this.state.user.lastName}</h1>
          {!this.isCurrentUser() && <a className="button" onClick={this.followButton}>{this.state.followButton}</a>}
          {this.isCurrentUser() && <Link className="button" to={`/users/${this.state.currentUser._id}/edit`}>Edit Profile</Link>}
        </div>
        <div className="column is-half-desktop">
          <p className="title is-5">{this.state.followers} followers</p>
          <p className="title is-5">{this.state.user.following.length} following</p>
          <p className="title is-5">{this.state.user.recommendations.length} recommendations</p>
        </div>
        <div className="column is-full-desktop">
          <p className="title is-5">Recommendations</p>
          {this.state.user.recommendations.map(recommendation =>
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

export default UsersShow;
