import React from 'react';
import Autocomplete from 'react-google-autocomplete';

const RecommendationsForm = ({ handleChange, handleSubmit, handleCitySelection, handlePlaceSelection, data }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="city">City</label>
        <Autocomplete types={['(cities)']} className="input" onPlaceSelected={handleCitySelection} placeholder="Search a city" value={data.city || ''} />
      </div>
      <div className="field">
        <label className="place">Place</label>
        <Autocomplete types={['establishment']} className="input" onPlaceSelected={handlePlaceSelection} placeholder="Search for your recommended place" />
      </div>
      <div className="field">
        <label className="content">Review</label>
        <input className="input" name="content" placeholder="Why do you recommend this?" onChange={handleChange} value={data.content || ''} />
      </div>
      <div className="field">
        <label className="rating">Rating</label>
        <input className="input" name="rating" placeholder="On a scale of 1 to 5" onChange={handleChange} value={data.rating || ''}/>
      </div>

      <button className="button">Submit</button>
    </form>
  );
};

export default RecommendationsForm;
