/* global google */

import React from 'react';

class GoogleMap2 extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.location,
      zoom: 13
    });

    for (let i = 0; i < this.props.markers.length; i++) {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.props.markers[i].location
      });
    }
  }

  componentWillUnmount() {
    this.map = null;
  }

  render() {
    return (
      <div className="google-map-2" ref={element => this.mapCanvas = element}/>
    );
  }
}

export default GoogleMap2;
