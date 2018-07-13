import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

import GoogleMap2 from '../common/GoogleMap2';

class CitiesShow extends React.Component {

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios({
      url: '/api/profile',
      method: 'GET',
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(res => this.setState({ currentUser: res.data }))
      .then(() => {
        axios.get(`/api/cities/${this.props.match.params.id}`)
          .then(res => this.setState({ city: res.data }))
          .then(() => this.setState({ recommendations: this.filteredRecommendations() }))
          .then(() => {
            axios({
              url: '/api/forecast',
              method: 'GET',
              params: {
                lat: this.state.city.location.lat,
                lng: this.state.city.location.lng
              }
            })
              .then(res => this.setState({ forcast: res.data }))
              .then(() => console.log(this.state));
          });
      });
  }

  filteredRecommendations() {
    return this.state.currentUser.following.map(followee => followee.recommendations[0]).filter(recommendation => recommendation.city._id === this.state.city._id);
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.city) return <h2 className="title is-2">Loading...</h2>;
    if(!this.state.recommendations) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half-desktop">
          <h1 className="title is-2">{this.state.city.name}, {this.state.city.country}</h1>
          {this.state.forecast && <h1>{this.state.forecast.currently.summary}</h1>}
          <hr />
        </div>
        <div className="column is-half-desktop">
          <h1 className="title is-2">Hello</h1>
          <hr />
        </div>
        <div className="column is-half-desktop">
          <h1 className="title is-3">Map</h1>
          {this.state.city && <GoogleMap2 location={this.state.city.location} markers={this.state.recommendations}/>}
        </div>
        <div className="column is-half-desktop">
          <h1 className="title is-3">Recommendations</h1>
          <hr />
          {!this.state.recommendations && <p>You currently do not follow anyone who has a recommendation for this city</p>}
          {this.state.recommendations.map(recommendation =>
            <div key={recommendation._id}>
              <div className="card">
                <div className="card-header">
                  <p className="card-header-title is-3">{recommendation.name}</p>
                  <h1 className="card-header-icon title is-6">Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">{recommendation.address}</h1>
                  <h1 className="title is-6">{recommendation.content}</h1>
                  <h1 className="title is-6">Recommended by <Link to={`/users/${recommendation.creator._id}`}>{recommendation.creator.firstName} {recommendation.creator.lastName}</Link></h1>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CitiesShow;
