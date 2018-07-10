/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: {lat: 48.5260, lng: 14.2551},
      zoom: 4
    });
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}/>
    );
  }
}

export default GoogleMap;
