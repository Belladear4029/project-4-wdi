/* global google */

import React from 'react';

class GoogleAutocomplete extends React.Component {

  componentDidMount() {
    this.map = new google.maps.places.Autocomplete(this.input);
  }

  render() {
    return (
      <input className="input google-autocomplete" ref={element => this.input = element}/>
    );
  }
}

export default GoogleAutocomplete;
