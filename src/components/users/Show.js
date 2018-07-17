import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {

  state = {
    showFollowers: false,
    showFollowing: false,
    showOpeningHours: false
  };

  componentDidMount() {
    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data, currentUser: Auth.getCurrentUser() }))
      .catch(err => this.setState({ error: err.message }));
  }

  componentWillReceiveProps = (nextProps) => {
    const nextId = nextProps.match.params.id;
    axios.get(`/api/users/${nextId}`)
      .then(res => this.setState({ user: res.data, currentUser: Auth.getCurrentUser() }))
      .catch(err => this.setState({ error: err.message }));
  }

  checkIfFollowing = () => {
    if(!this.state.currentUser) return false;
    const followers = this.state.user.followers.map(followee => followee._id);
    return followers.includes(this.state.currentUser._id);
  }

  handleFollow = () => {
    this.checkIfFollowing() ? this.unfollow() : this.follow();
  }

  follow = () => {
    axios({
      url: `/api/users/${this.props.match.params.id}/follow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const followers = this.state.user.followers.concat(Auth.getCurrentUser());
        const user = { ...this.state.user, followers };
        this.setState({ user });
        Auth.setCurrentUser(res.data);
      });
  }

  unfollow = () => {
    axios({
      url: `/api/users/${this.props.match.params.id}/unfollow`,
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => {
        const followers = this.state.user.followers.filter(user => user._id !== Auth.getCurrentUser()._id);
        const user = { ...this.state.user, followers };
        this.setState({ user });
        Auth.setCurrentUser(res.data);
      });
  }

  isCurrentUser = () => {
    if(this.state.currentUser) return this.state.user._id === this.state.currentUser._id;
  }

  toggleShowFollowers = () => {
    this.setState({ showFollowers: !this.state.showFollowers });
  }

  toggleShowFollowing = () => {
    this.setState({ showFollowing: !this.state.showFollowing });
  }

  showOpeningHours = (selectedRecommendation) => {
    const user = this.state.user;
    user.recommendations = user.recommendations.map((recommendation) => {
      if (selectedRecommendation._id === recommendation._id) {
        recommendation.showOpeningHours = !recommendation.showOpeningHours;
      }
      return recommendation;
    });
    this.setState({ user });
  }

  handleDelete = (selectedRecommendation) => {
    axios({
      url: `/api/recommendations/${selectedRecommendation._id}`,
      method: 'DELETE',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(() => {
        const recommendations = this.state.user.recommendations.filter(recommendation => recommendation._id !== selectedRecommendation._id);
        const user = { ...this.state.user, recommendations };
        this.setState({ user });
      });
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half">
          {!this.state.user.image && <img className="user-image" src="https://www.qualiscare.com/wp-content/uploads/2017/08/default-user.png" alt="default user image" />}
          {this.state.user.image && <img className="user-image" src={this.state.user.image} />}
          <h1 className="title is-2">{this.state.user.firstName} {this.state.user.lastName}</h1>
          {!this.isCurrentUser() && Auth.isAuthenticated() && <a className="button" onClick={this.handleFollow}>{this.checkIfFollowing() ? 'Unfollow' : 'Follow'}</a>}
          {this.isCurrentUser() && <Link className="button" to={`/users/${this.state.currentUser._id}/edit`}>Edit Profile</Link>}
        </div>
        <div className="column is-half">
          <p className="title is-5" onClick={this.toggleShowFollowers}>{this.state.user.followers.length} followers</p>
          {this.state.showFollowers && <ul>
            <hr />
            {this.state.user.followers.map(user =>
              <li key={user._id}>{user.firstName} {user.lastName}</li>
            )}
            <hr />
          </ul>}
          <p className="title is-5" onClick={this.toggleShowFollowing}>{this.state.user.following.length} following</p>
          {this.state.showFollowing && <ul>
            <hr />
            {this.state.user.following.map(user =>
              <li key={user._id}>{user.firstName} {user.lastName}</li>
            )}
            <hr />
          </ul>}
          <p className="title is-5">{this.state.user.recommendations.length} recommendations</p>
        </div>
        <div className="column is-full">
          <p className="title is-3 is-centered">Recommendations</p>
          {!this.state.user.recommendations.length && <div className="is-centered">
            <p>You currently have no recommendations.</p>
            <Link to="/recommendations/new">Add a new recommendation</Link>
          </div>}
          {this.state.user.recommendations.map(recommendation =>
            <div key={recommendation._id}>
              <div className="card recommendation-card">
                <div className="card-header">
                  <h1 className="card-header-title is-3 city"><Link to={`/cities/${recommendation.city._id}`}>{recommendation.city.name}</Link></h1>
                  <h1 className="card-header-title is-3 name">{recommendation.name}</h1>
                  {recommendation.priceLevel && <h1 className="card-header-icon title is-6">{recommendation.city.currency.repeat(recommendation.priceLevel)}</h1>}
                  <h1 className="card-header-icon title is-6"> Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">Address: {recommendation.address}</h1>
                  <h1 className="title is-6 content">{recommendation.content}</h1>
                  <a className="title is-6 opening-hours" onClick={() => this.showOpeningHours(recommendation)}>Click for opening hours</a>
                  {recommendation.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
                    <li key={i}>{hour}</li>
                  )}</ul>}
                  {recommendation.showOpeningHours && !recommendation.openingHours && <small>No opening hours available</small>}
                </div>
                <div className="card-footer">
                  {this.isCurrentUser() && <Link to={`/recommendations/${recommendation._id}/edit`} className="card-footer-item">Edit</Link>}
                  {this.isCurrentUser() && <a onClick={() => this.handleDelete(recommendation)} className="card-footer-item">Delete</a>}
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
