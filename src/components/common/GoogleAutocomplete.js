/* global google */

import React from 'react';

class GoogleAutocomplete extends React.Component {

  componentDidMount() {
    this.map = new google.maps.places.Autocomplete(this.input, {
      types: ['geocode']
    });
  }

  render() {
    return (
      <input className="input google-autocomplete" placeholder={this.props.placeholder} ref={element => this.input = element}/>
    );
  }
}

export default GoogleAutocomplete;
