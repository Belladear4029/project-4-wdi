/* global google */

import React from 'react';

class GoogleAutocomplete extends React.Component {

  componentDidMount() {
    this.map = new google.maps.places.Autocomplete(this.input, {
      types: ['geocode']
    });
  }

  // handleChange = () => {
  //   console.log(this.map.getPlace().formatted_address);
  // }

  render() {
    return (
      <div>
        <input className="input google-autocomplete" placeholder={this.props.placeholder} ref={element => this.input = element}/>
      </div>
    );
  }
}

export default GoogleAutocomplete;
