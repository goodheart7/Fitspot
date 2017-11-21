import React, { Component, PropTypes } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

class PlacesAutoCompleteComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false,
      addressType: null,
      addressValue: null,
      currentChanged: false
    };
    this.handleSelect = this.handleSelect.bind(this);
    this.renderGeocodeFailure = this.renderGeocodeFailure.bind(this);
    this.renderGeocodeSuccess = this.renderGeocodeSuccess.bind(this);
  }

    componentForm = {
        street_number: 'short_name',
        route: 'long_name',
        locality: 'long_name',
        administrative_area_level_1: 'short_name',
        country: 'long_name',
        postal_code: 'short_name'
    };

  fillInForm = (res) => {
      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (let i = 0; i < res.address_components.length; i++) {
          let addressType = res.address_components[i].types[0];
          if (this.componentForm[addressType]) {
              let val = res.address_components[i][this.componentForm[addressType]];
              this.props.fillForm(addressType, val);
              //document.getElementById(addressType).value = val;
          }
      }
  };

  componentWillReceiveProps(nextProps){
      if(nextProps.currentLocation.hasOwnProperty('lat') && !this.state.geocodeResults && !this.state.currentChanged) {
          this.reverseGeo(nextProps.currentLocation, true);
          this.setState({
              geocodeResults: this.renderGeocodeSuccess(nextProps.currentLocation.lat, nextProps.currentLocation.lon)
          });
      }
      if(nextProps.desired) {
          this.setState({
              address: nextProps.desired
          })
      }
  }
  reverseGeo (loc, isCurrent) {
      const geocoder = new google.maps.Geocoder;
      let self = this;
      geocoder.geocode({'location': {lat: loc.lat, lng: loc.lon}}, function(results, status) {
          if (status === 'OK') {
              if (results[0]) {
                  self.handleSelect(results[0].formatted_address, isCurrent)
              } else {
                  window.alert('No results found');
              }
          } else {
              window.alert('Geocoder failed due to: ' + status);
          }
      });
  }
  handleSelect(address, isCurrent) {
    this.props.address(address, isCurrent, true);
    this.setState({
      address,
      loading: true
    });

    geocodeByAddress(address,  (err, { lat, lng }, results) => {
      if (err) {
        this.setState({
          geocodeResults: this.renderGeocodeFailure(err),
          loading: false
        })
      }
      this.fillInForm(results[0]);
      this.setState({
        geocodeResults: this.renderGeocodeSuccess(lat, lng),
        loading: false
      })
    })
  }

  handleChange(address) {
    this.props.address(address, false, false);
    this.setState({
      address,
      geocodeResults: null,
      currentChanged: true
    });
  }

  renderGeocodeFailure(err) {
    return (
      <div className="alert alert-danger" role="alert">
        <strong>Error!</strong> {err}
      </div>
    )
  }

    initAutocomplete() {
        // eslint-disable-next-line no-undef
        const autocomplete = new window.google.maps.places.Autocomplete((this.refs.autoCompletePlaces), {types: ['geocode']});

        autocomplete.addListener('place_changed', this.fillInAddress);
        this.setState({ autocomplete });
    }

  renderGeocodeSuccess(lat, lng) {
    this.props.locationData({lat: lat, lng: lng});
    return (
      <div className="alert alert-success" role="alert">
        <strong>Success!</strong> Geocoder found latitude and longitude: <strong>{lat}, {lng}</strong>
      </div>
    )
  }

  render() {
    const cssClasses = {
      root: 'input-group col-xs-6',
      label: 'form-label',
      input: `Demo__search-input form-control ${this.props.currentLocation.hasOwnProperty('lat') ? '' : 'special'}`,
      autocompleteContainer: 'Demo__autocomplete-container'
    };

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>);

    return (
      <div className='page-wrapper'>
        <div className='container'>
          <div className="input-group">
            <span className="input-group-addon"><i className="fa fa-2x fa-search" aria-hidden="true" /></span>
            <PlacesAutocomplete
              value={this.state.address || this.props.desired}
              onChange={(e) => this.handleChange(e)}
              onSelect={this.handleSelect}
              classNames={cssClasses}
              autocompleteItem={AutocompleteItem}
              autoFocus={true}
              placeholder="Search"
              hideLabel={true}
              inputName="gymsearch-input"
              onEnterKeyDown={this.handleSelect}
            />

            {this.state.loading ? <div><i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" /></div> : null}
          </div>
        </div>
      </div>
    )
  }
}

PlacesAutoCompleteComponent.propTypes = {

};

export default PlacesAutoCompleteComponent;
