import React from 'react';
import { Link } from 'react-router-dom';

const RecommendationsCard = ({ data }) => {
  return (
    data.user.recommendations.map(recommendation =>
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
            {data.showOpeningHours && recommendation.openingHours && <ul>{recommendation.openingHours.map((hour, i) =>
              <li key={i}>{hour}</li>
            )}</ul>}
          </div>
          <div className="card-footer">
            <Link to={`/recommendations/${recommendation._id}/edit`} className="card-footer-item">Edit</Link>
            <a onClick={() => this.handleDelete(recommendation)} className="card-footer-item">Delete</a>
          </div>
        </div>
      </div>
    )
  );
};

export default RecommendationsCard;
