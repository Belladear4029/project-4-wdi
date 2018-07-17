import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';
import CityMap from '../common/CityMap';

class CitiesShow extends React.Component {

  state = {
    recommenderFilter: false
  };

  componentDidMount = () => {
    axios.get(`/api/cities/${this.props.match.params.id}`)
      .then(res => this.setState({ city: res.data, currentUser: Auth.getCurrentUser() }));
  }

  filtersByRecommenders = (recommendations) => {
    if(!this.state.currentUser) return [];
    if(this.state.recommenderFilter) {
      const filteredRecommendations = recommendations.filter(recommendation => {
        return this.state.currentUser.following.includes(recommendation.creator._id);
      });
      return filteredRecommendations;
    } else return recommendations;
  }

  filtersByTypeOfPlace = (recommendations) => {
    if(!this.state.city) return [];
    if(recommendations && this.state.placeFilter) {
      const filteredRecommendations = recommendations.filter(recommendation => {
        return recommendation.types.includes(this.state.placeFilter);
      });
      return filteredRecommendations;
    } else return this.state.city.recommendations;
  }

  filteredRecommendations = () => {
    const filteredByPlace = this.filtersByTypeOfPlace(this.state.city.recommendations);
    return this.filtersByRecommenders(filteredByPlace);
  }

  handlePlaceFilter = (e) => {
    if(e.target.value) this.setState({ placeFilter: e.target.value });
    else this.setState({ placeFilter: false });
  }

  handleRecommenderFilter = () => {
    this.setState({ recommenderFilter: !this.state.recommenderFilter });
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

  render() {
    console.log(this.state.city);
    if(this.state.error) return <h2 className="title is-2">{this.state.error}</h2>;
    if(!this.state.city) return <h2 className="title is-2">Loading...</h2>;
    return (
      <div className="columns is-multiline">
        <div className="column is-half">
          <h1 className="title is-2 city">{this.state.city.name}, {this.state.city.country}</h1>
          <hr />
          <h5 className="title is-5">Currency: {this.state.city.currency}</h5>
          <h5 className="title is-5">Rate: £1 = {this.state.city.exchangeRate} {this.state.city.currency}</h5>
        </div>
        <div className="column is-half">
          <h2 className="title is-2">{this.state.city.localHello}!</h2>
          <hr />
        </div>
        <div className="column is-full">
          <CityMap location={this.state.city.location} places={this.filteredRecommendations()}/>
        </div>
        <div className="column is-full">
          <h3 className="title is-3 is-centered">Recommendations</h3>
          <div className="filters">
            <div className="control">
              <h2>Recommenders:</h2>
              <div className="select">
                <select onChange={this.handleRecommenderFilter}>
                  <option>All</option>
                  <option>Following</option>
                </select>
              </div>
            </div>
            <div className="control">
              <h2>Type of place:</h2>
              <div className="select">
                <select onChange={this.handlePlaceFilter}>
                  <option value="">All</option>
                  <option value="bar">Bars</option>
                  <option value="restaurant">Restaurants</option>
                  <option value="art_gallery">Art Galleries</option>
                  <option value="museum">Museums</option>
                  <option value="night_club">Night Clubs</option>
                </select>
              </div>
            </div>
          </div>
          <hr />
          {!this.filteredRecommendations().length && <p>No recommendations.</p>}
          {this.filteredRecommendations().map(recommendation =>
            <div key={recommendation._id}>
              <div className="card recommendation-card">
                <div className="card-header">
                  <p className="card-header-title is-3 name">{recommendation.name}</p>
                  {recommendation.priceLevel && <h6 className="card-header-icon title is-6"> {this.state.city.currency.repeat(recommendation.priceLevel)}</h6>}
                  <h6 className="card-header-icon title is-6">Rating: {recommendation.rating}</h6>
                </div>
                <div className="card-content">
                  <h6 className="title is-6">Address: {recommendation.address}</h6>
                  <h6 className="title is-6">{recommendation.content}</h6>
                  <a className="title is-6 opening-hours" onClick={() => this.showOpeningHours(recommendation)}>Click for opening hours</a>
                  {recommendation.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
                    <li key={i}>{hour}</li>
                  )}</ul>}
                  {recommendation.showOpeningHours && !recommendation.openingHours && <small>No opening hours available</small>}
                </div>
                <div className="card-footer">
                  <h2 className="card-footer-item">Recommended by <Link className="name-link" to={`/users/${recommendation.creator._id}`}>{recommendation.creator.firstName} {recommendation.creator.lastName}</Link></h2>
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
