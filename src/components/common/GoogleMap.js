/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: {lat: 48.5260, lng: 14.2551},
      zoom: 4
    });

    for (let i = 0; i < this.props.cities.length; i++) {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.props.cities[i].location
      });
      this.marker.addListener('click', function() {
        this.map.setZoom(8);
      });
    }

  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }

  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}/>
    );
  }
}

export default GoogleMap;
