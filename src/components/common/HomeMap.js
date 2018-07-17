/* global google */

import React from 'react';

class HomeMap extends React.Component {

  componentDidMount() {
    this.map = new google.maps.Map(this.mapCanvas, {
      center: {lat: 52.5260, lng: 7.2551},
      zoom: 3,
      styles: [
        {
          'featureType': 'all',
          'elementType': 'labels.text',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'all',
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'landscape',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#f1efe8'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'gamma': '1.19'
            }
          ]
        },
        {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'visibility': 'on'
            },
            {
              'gamma': '0.00'
            },
            {
              'weight': '2.07'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#b2ac83'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#b2ac83'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
            {
              'color': '#8ac0c4'
            }
          ]
        }]
    });

    const selectCity = this.props.selection;

    this.markers = this.props.cities.map(city => {
      const marker = new google.maps.Marker({
        map: this.map,
        position: city.location,
        icon: {
          url: 'https://www.artedellanima.ro/wp-content/uploads/2018/01/pin.png',
          scaledSize: new google.maps.Size(30, 30)
        }
      });
      marker.addListener('click', () => selectCity(city));

      return marker;
    });

  }

  componentWillReceiveProps(props) {
    if(props.location === this.props.location) {
      this.map.setZoom(6);
      this.map.setCenter(props.location);
    }
  }

  componentWillUnmount() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
    this.map = null;
  }

  render() {
    return (
      <div className="home-map" ref={element => this.mapCanvas = element}/>
    );
  }
}

export default HomeMap;
