import React, {PropTypes, Component} from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {markerStyle, markerStyleHover, infoWindowStyle, markerButton} from './MarkerComponentStyle.js';

export default class MarkerComponent extends Component {

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

    close(){

    }

  render() {
        const style = this.props.hover ? markerStyleHover : markerStyle;
        const { address, city, name, state, zipcode, description } = this.props.data;
        return (
        <div>
            <div className={"map-marker hint hint--html hint--info hint--top " + (this.props.clicked ? 'hint--always' : '')} style={style}>
                <div></div>
                <div style={infoWindowStyle}
                     className={"hint__content map-marker-hint " + (this.props.clicked ? '' : 'noevents')}>
                    <div className={"map-marker-hint__close-button " +(this.props.clicked ? 'map-marker-hint__close-button--visible' : '')}></div>
                    <div className="map-marker-hint__title">
                        <strong>{name}</strong>
                    </div>
                    <div className="map-marker-hint__address">{`${zipcode} ${address} ${city}`}</div>
                    <div className={"map-marker-hint__content " + (this.props.clicked ? 'map-marker-hint__content--visible' : '' )}>
                        {description ? description : 'No description available.'}
                    </div>
                    <div>
                        <a className={"map-marker-hint__ap-link " + (this.props.clicked ? 'map-marker-hint__ap-link--hidden' : '')}>Click the marker to view more info</a>
                    </div>
                    <div style={markerButton} onClick={this.props.onLocationSelected.bind(this, this.props.data)}>
                        <i style={{paddingRight: 10}}className="fa fa-sign-out"></i>
                    </div>
                </div>
            </div>
        </div>
        );
  }
}
