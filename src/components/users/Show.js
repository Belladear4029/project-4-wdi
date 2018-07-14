import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
// import RecommendationsCard from '../recommendations/Card';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {
      follow: false,
      showFollowers: false,
      showFollowing: false,
      showOpeningHours: false
    };

    this.toggleFollowing = this.toggleFollowing.bind(this);
    this.toggleShowFollowers = this.toggleShowFollowers.bind(this);
    this.toggleShowFollowing = this.toggleShowFollowing.bind(this);
    this.isCurrentUser = this.isCurrentUser.bind(this);
    this.showOpeningHours = this.showOpeningHours.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data, currentUser: Auth.getCurrentUser() }))
      .catch(err => this.setState({ error: err.message }));
  }

  checkIfFollowing() {
    if(!this.state.currentUser) return false;
    const followers = this.state.user.followers.map(followee => followee._id);
    return followers.includes(this.state.currentUser._id);
  }

  toggleFollowing() {
    this.state.follow ? this.unfollow() : this.follow();
  }

  follow() {
    axios({
      url: `/api/users/${this.props.match.params.id}/follow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const followers = this.state.user.followers.concat(Auth.getCurrentUser());
        const following = this.state.currentUser.following.concat(this.state.user);
        const user = { ...this.state.user, followers, following };
        this.setState({ user });
      });
  }

  unfollow() {
    axios({
      url: `/api/users/${this.props.match.params.id}/unfollow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const followers = this.state.user.followers.concat(Auth.getCurrentUser());
        const user = { ...this.state.user, followers };
        this.setState({ user });
      });
  }

  isCurrentUser() {
    if(this.state.currentUser) return this.state.user._id === this.state.currentUser._id;
  }

  toggleShowFollowers() {
    this.setState({ showFollowers: !this.state.showFollowers });
  }

  toggleShowFollowing() {
    this.setState({ showFollowing: !this.state.showFollowing });
  }

  showOpeningHours() {
    this.setState({ showOpeningHours: true});
  }

  handleDelete(recommendation) {
    axios({
      url: `/api/recommendations/${recommendation._id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.props.history.replace(`/api/users/${this.state.currentUser._id}`));
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <img src={this.state.user.image} />
          <h1 className="title is-2">{this.state.user.firstName} {this.state.user.lastName}</h1>
          {!this.isCurrentUser() && <a className="button" onClick={this.toggleFollowing}>{this.checkIfFollowing() ? 'Unfollow' : 'Follow'}</a>}
          {this.isCurrentUser() && <Link className="button" to={`/users/${this.state.currentUser._id}/edit`}>Edit Profile</Link>}
        </div>
        <div className="column is-half-desktop">
          <p className="title is-5" onClick={this.toggleShowFollowers}>{this.state.user.followers.length} followers</p>
          {this.state.showFollowers && <ul>
            {this.state.user.followers.map(user =>
              <li key={user._id}>{user.firstName} {user.lastName}</li>
            )}
          </ul>}
          <p className="title is-5" onClick={this.toggleShowFollowing}>{this.state.user.following.length} following</p>
          {this.state.showFollowing && <ul>
            {this.state.user.following.map(user =>
              <li key={user._id}>{user.firstName} {user.lastName}</li>
            )}
          </ul>}
          <p className="title is-5">{this.state.user.recommendations.length} recommendations</p>
        </div>
        <div className="column is-full-desktop">
          <p className="title is-5">Recommendations</p>
          {this.state.user.recommendations.map(recommendation =>
            <div key={recommendation._id}>
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title is-3"><Link to={`/cities/${recommendation.city._id}`}>{recommendation.city.name}</Link> - {recommendation.name}</p>
                  {recommendation.priceLevel && <h1 className="card-header-icon title is-6"> Price Level: {recommendation.priceLevel}</h1>}
                  <h1 className="card-header-icon title is-6"> Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">{recommendation.address}</h1>
                  <h1 className="title is-6">{recommendation.content}</h1>
                  <a className="title is-6" onClick={this.showOpeningHours}>Click for opening hours</a>
                  {this.state.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
                    <li key={i}>{hour}</li>
                  )}</ul>}
                </div>
                <div className="card-footer">
                  {this.isCurrentUser() && <Link to={`/recommendations/${recommendation._id}/edit`} className="card-footer-item">Edit</Link>}
                  {this.isCurrentUser() && <a onClick={() => this.handleDelete(recommendation)} className="card-footer-item">Delete</a>}
                </div>
              </div>
            </div>
          )}
          {/* <RecommendationsCard
            data={this.state}
          /> */}
        </div>
      </div>
    );
  }
}

export default UsersShow;
