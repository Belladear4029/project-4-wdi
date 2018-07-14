import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
// import RecommendationsCard from '../recommendations/Card';
import CityMap from '../common/CityMap';

class CitiesShow extends React.Component {

  constructor() {
    super();
    this.state = {
      showOpeningHours: false
    };

    this.isCurrentUser = this.isCurrentUser.bind(this);
    this.showOpeningHours = this.showOpeningHours.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/cities/${this.props.match.params.id}`)
      .then(res => this.setState({ city: res.data }))
      .then(() => {
        axios({
          url: '/api/forecast',
          method: 'GET',
          params: this.state.city.location
        })
          .then(res => this.setState({ forcast: res.data, currentUser: Auth.getCurrentUser() }));
      });
  }

  filteredRecommendations() {
    if(!this.state.currentUser) return [];
    console.log(this.state);
    const followingIds = this.state.currentUser.following.map(user => user._id);
    return this.state.city.recommendations.filter(recommendation => {
      return followingIds.includes(recommendation.creator._id);
    });
  }

  isCurrentUser() {
    if(this.state.currentUser) return this.state.city.recommendations.map(recommendation => recommendation.creator._id === this.state.currentUser._id);
  }

  showOpeningHours() {
    this.setState({ showOpeningHours: !this.state.showOpeningHours});
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.city) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half">
          <h1 className="title is-2">{this.state.city.name}, {this.state.city.country}</h1>
          {this.state.forecast && <h4>{this.state.forecast.currently.summary}</h4>}
          <hr />
        </div>
        <div className="column is-half">
          <h1 className="title is-2">Hello</h1>
          <hr />
        </div>
        <div className="column is-full">
          <h1 className="title is-3">Map</h1>
          <CityMap location={this.state.city.location} markers={this.filteredRecommendations()}/>
        </div>
        <div className="column is-full">
          <h1 className="title is-3">Recommendations</h1>
          <hr />
          {!this.filteredRecommendations().length && <p>You currently do not follow anyone who has a recommendation for this city</p>}
          {this.state.city.recommendations.map(recommendation =>
            <div key={recommendation._id}>
              <div className="card recommendation-card">
                <div className="card-header">
                  <p className="card-header-title is-3">{recommendation.name}</p>
                  {recommendation.priceLevel && <h1 className="card-header-icon title is-6"> Price Level: {recommendation.priceLevel}</h1>}
                  <h1 className="card-header-icon title is-6">Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">Address: {recommendation.address}</h1>
                  <h1 className="title is-6">{recommendation.content}</h1>
                  <a className="title is-6 opening-hours" onClick={this.showOpeningHours}>Click for opening hours</a>
                  {this.state.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
                    <li key={i}>{hour}</li>
                  )}</ul>}
                  {this.state.showOpeningHours && !recommendation.openingHours && <small>No opening hours available</small>}
                </div>
                <div className="card-footer">
                  <h1 className="card-footer-item">Recommended by <Link to={`/users/${recommendation.creator._id}`}> {recommendation.creator.firstName} {recommendation.creator.lastName}</Link></h1>
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
