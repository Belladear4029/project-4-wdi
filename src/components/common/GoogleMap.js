/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: {lat: 48.5260, lng: 14.2551},
      zoom: 4
    });

    const selectCity = this.props.selection;

    this.props.cities.forEach(city => {
      this.marker = new google.maps.Marker({ map: this.map, position: city.country.location });
      this.marker.addListener('click', function() {

      });
    });

    this.props.cities.forEach(city => {
      this.marker = new google.maps.Marker({ map: this.map, position: city.location });
      this.marker.addListener('click', function() {
        selectCity(city);
      });
    });
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
