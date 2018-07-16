import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import CityMap from '../common/CityMap';

class CitiesShow extends React.Component {

  state = {
    filter: false
  };

  componentDidMount = () => {
    axios.get(`/api/cities/${this.props.match.params.id}`)
      .then(res => this.setState({ city: res.data, currentUser: Auth.getCurrentUser() }));
  }

  filteredRecommendations = () => {
    if(!this.state.currentUser) return [];
    if(this.state.filter) {
      const filteredRecommendations = this.state.city.recommendations.filter(recommendation => {
        return this.state.currentUser.following.includes(recommendation.creator._id);
      });
      return filteredRecommendations;
    } else return this.state.city.recommendations;
  }

  isCurrentUser = () => {
    if(this.state.currentUser) return this.state.city.recommendations.map(recommendation => recommendation.creator._id === this.state.currentUser._id);
  }

  showOpeningHours = (selectedRecommendation) => {
    const city = this.state.city;
    city.recommendations = city.recommendations.map((recommendation) => {
      if (selectedRecommendation._id === recommendation._id) {
        recommendation.showOpeningHours = !recommendation.showOpeningHours;
      }
      return recommendation;
    });
    this.setState({ city });
  }

  handleFilter = () => {
    this.setState({ filter: !this.state.filter });
  }

  render() {
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.city) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half">
          <h1 className="title is-2">{this.state.city.name}, {this.state.city.country}</h1>
          <p>Currency: {this.state.city.currency}</p>
          <hr />
        </div>
        <div className="column is-half">
          <h1 className="title is-2">{this.state.city.localHello}!</h1>
          <hr />
        </div>
        <div className="column is-full">
          <CityMap location={this.state.city.location} places={this.filteredRecommendations()}/>
        </div>
        <div className="column is-full">
          <h1 className="title is-3">Recommendations</h1>
          <p>Filter:</p>
          <div className="control">
            <div className="select">
              <select onChange={this.handleFilter}>
                <option>All</option>
                <option>Following</option>
              </select>
            </div>
          </div>
          <hr />
          {!this.filteredRecommendations().length && <p>You currently do not follow anyone who has a recommendation for this city</p>}
          {this.filteredRecommendations().map(recommendation =>
            <div key={recommendation._id}>
              <div className="card recommendation-card">
                <div className="card-header">
                  <p className="card-header-title is-3">{recommendation.name}</p>
                  {recommendation.priceLevel && <h1 className="card-header-icon title is-6"> {this.state.city.currency.repeat(recommendation.priceLevel)}</h1>}
                  <h1 className="card-header-icon title is-6">Rating: {recommendation.rating}</h1>
                </div>
                <div className="card-content">
                  <h1 className="title is-6">Address: {recommendation.address}</h1>
                  <h1 className="title is-6">{recommendation.content}</h1>
                  <a className="title is-6 opening-hours" onClick={() => this.showOpeningHours(recommendation)}>Click for opening hours</a>
                  {recommendation.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
                    <li key={i}>{hour}</li>
                  )}</ul>}
                  {recommendation.showOpeningHours && !recommendation.openingHours && <small>No opening hours available</small>}
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
