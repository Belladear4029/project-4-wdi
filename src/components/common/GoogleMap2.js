/* global google */

import React from 'react';

class GoogleMap2 extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.location,
      zoom: 8
    });

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
