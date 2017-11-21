import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
GymsMap = controllable(GymsMap,['center', 'zoom', 'hoverKey', 'clickKey']);

import GoogleMap from 'google-map-react';
import MarkerComponent from './MarkerComponent.jsx';
export default class GymsMap extends Component {
  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    hoverKey: PropTypes.string,
    clickKey: PropTypes.string,
    newLocationData: PropTypes.object
  };
  constructor(props) {
    super(props);
    this.state = {
      center: [33.8101512, -84.4225184],
      zoom: 12,
      map: null,
      maps: null,
      hoverKey: null,
      clickKey: null
    }
  }

    componentWillReceiveProps(nextProps){
      if(nextProps.newLocationData){
          this.setState({
              center: [nextProps.newLocationData.lat, nextProps.newLocationData.lng],
          });
          if(this.marker){
            this.marker.setMap(null);
          }
          //this.marker.setMap(null);
          if(nextProps.isCurrent === true){
              this.renderMarker({lat: nextProps.newLocationData.lat, lng: nextProps.newLocationData.lng}, true);
          }else{
              this.renderMarker({lat: nextProps.newLocationData.lat, lng: nextProps.newLocationData.lng}, false);
          }

      }
    }

  _onBoundsChange = ({center, zoom} /* , bounds, marginBounds */) => {
    this.setState({
      center: center,
      zoom: zoom,
      clickKey: null
    })
  };

  _onChildClick = (key, childProps) => {
    this.setState({
      clickKey: this.state.clickKey == key ? null : key
    })
  };

  _onChildMouseEnter = (key /*, childProps */) => {
    this.setState({
      hoverKey : key
    })
  };

  _onChildMouseLeave = (/* key, childProps */) => {
    this.setState({
      hoverKey: null
    })
  };

  renderMarkers = (map, maps) => {
    this.setState({
        map: map,
        maps: maps
    });
  };

  renderMarker = (location, isCurrent) => {
      
      let map = this.state.map;
      let pinIcon = new this.state.maps.MarkerImage(
          isCurrent ? require('@assets/img/blue-marker.png') : require('@assets/img/marker.png'),
          null, /* size is determined at runtime */
          null, /* origin is 0,0 */
          null, /* anchor is bottom center of the scaled image */
          new google.maps.Size(40, 40)
      );
      this.marker = new this.state.maps.Marker({
          position: location,
          map,
          icon: pinIcon
      });
  };


  render() {
    const markers = this.props.markers.gyms
      .map(marker => {
        return (
          <MarkerComponent
            key={marker.id}
            lat={marker.lat}
            lng={marker.lon}
            data={marker}
            onLocationSelected={this.props.onLocationSelected}
            clicked={+this.state.clickKey === marker.id}
            hover={+this.state.hoverKey === marker.id} />
        );
      });

    return (
       <GoogleMap
           style={{height: '100vh'}}
           bootstrapURLKeys={{key: "AIzaSyArRWqezgpwrJhw9l24KVRLZbdkTQ-IVxU"}}
           hoverDistance={15}
           center={this.state.center}
           zoom={this.state.zoom}
           onChange={this._onBoundsChange}
           onGoogleApiLoaded={({map, maps}) => this.renderMarkers(map, maps)}
           yesIWantToUseGoogleMapApiInternals
           onChildClick={this._onChildClick}
           onChildMouseEnter={this._onChildMouseEnter}
           onChildMouseLeave={this._onChildMouseLeave}
        >
        {markers}
      </GoogleMap>
    );
  }
}
