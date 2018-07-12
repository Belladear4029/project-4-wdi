import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class UsersShow extends React.Component {

  constructor() {
    super();
    this.state = {
      edit: '',
      follow: 'Follow'
    };
  }

  componentDidMount() {


    axios.get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .then(() => {
        if(this.state.user._id === Auth.getPayload().sub) this.setState({ edit: 'Edit Profile' });
        // console.log(this.state);
        // if(Auth.getPayload().sub.following[this.state.user._id]) this.setState({ follow: 'Unfollow' });
      })
      .catch(err => this.setState({ error: err.message }));

    axios({
      url: '/api/profile',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => console.log(this.state));
  }

  follow() {
    // currentUser.following.push(this.state.user)
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
          <a className="button" onClick={this.follow}>{this.state.follow}</a>
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
