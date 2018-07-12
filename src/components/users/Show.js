import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {
      edit: '',
      follow: false,
      followButton: 'Follow'
    };

    this.follow = this.follow.bind(this);
  }

  componentDidMount() {

    // if(this.state.follow) this.setState({ follow: 'Unfollow' });

    axios({
      url: '/api/currentUser',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => {
        axios.get(`/api/users/${this.props.match.params.id}`)
          .then(res => this.setState({ user: res.data }))
          .then(() => {
            if(this.state.user._id === this.state.currentUser._id) this.setState({ edit: 'Edit Profile' });
            if(this.state.currentUser.following.includes(this.state.user._id)) this.setState({ follow: true, followButton: 'Unfollow' });
          })
          .then(() => console.log(this.state))
          .catch(err => this.setState({ error: err.message }));
      });
  }

  follow() {
    if(!this.state.follow) {
      this.setState({ followButton: 'Unfollow' });
      this.state.currentUser.following.push(this.state.user);
    } else {
      this.setState({ followButton: 'Follow' });
      this.state.currentUser.following.splice(this.state.user);
    }
    axios({
      url: '/api/currentUser',
      method: 'PUT',
      headers: { Authorization: `Bearer ${Auth.getToken()}` },
      data: this.state.currentUser
    });
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.user) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <img src={this.state.user.image} />
          <h1 className="title is-2">{this.state.user.firstName} {this.state.user.lastName}</h1>
          <Link to={`/users/${this.state.user._id}/edit`}>{this.state.edit}</Link>
          <a className="button" onClick={this.follow}>{this.state.followButton}</a>
        </div>
        <div className="column is-half-desktop">
          <p className="title is-5">{this.state.user.followers} followers</p>
          <p className="title is-5">{this.state.user.following} following</p>
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
