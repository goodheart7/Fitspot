import React from 'react';
import GymInfoCard from './GymInfoCard';
import CustomLocationCard from './CustomLocationCard';
import AddressForm from './AddressForm';
import Geosuggest from 'react-geosuggest';
import PlacesAutoCompleteComponent from '../PlacesAutoCompleteComponent'
import GymsMap from './map/gyms-map';
import events from '@utils/Events';
import CONSTS from '@utils/Consts';

type Props = {
  gyms: Object,
  bookingState: Object,
  selectLocation: Function,
  locationPermission: bool,
  currentLocation: Object,
  currentItem: 0,
  addLocation: Function,
};

class ChooseLocation extends React.Component {

  constructor(props) {
    super(props);

    let currentStep = this.props.bookingState.currentStep;
    let totalSteps = this.props.bookingState.totalSteps;
    let selectedOption = this.props.bookingState.sessionLocations.length > 0 ? 'prevLocation': 'newLocation';
    this.state = {
      currentStep: currentStep,
      totalSteps: totalSteps,
      locationPermission: props.locationPermission,
      selectedOption: selectedOption,
      desiredAddress: '',
      locationData: null,
      addressType: null,
      addressValue: null,
      isCurrent: null
    };
    this.lastDesiredAddress = null;
    this.doneLoadingAddress = false;
    //{lat: 33.8101512, lng: -84.4225184}
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
    }
  }
  renderLocation() {
    if(this.state.selectedOption == 'prevLocation') {
      return this._renderPrevLocation();
    } else {
      return this._renderNewLocation();
    }
  }

  desiredAddress(val, isCurrent, done) {
      this.setState({
          desiredAddress: val,
          isCurrent: isCurrent
      });
      this.doneLoadingAddress = done;
  }

  _newLocationData(data) {
      this.setState({
          locationData: data
      })
  }

  fillForm = (addressType, val) => {
      this.setState({
          addressType: addressType,
          addressValue: val
      });
  };

  handleAddLocationClick() {
    this.setState({selectedOption :'newLocation'});
  }
  _renderNewLocation() {
      if (this.props.bookingState.gyms.length === 0 && this.doneLoadingAddress && this.state.desiredAddress !== this.lastDesiredAddress) {
          events.bookingNoGyms(this.props.bookingState.bookingType, this.state.desiredAddress);
          this.lastDesiredAddress = this.state.desiredAddress;
          this.selectedAddress = false;
      }
    return (
        <div>
            <div className="container">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <div className="form-group">
                        <label htmlFor="exampleDesiredAddress">Your Desired Address</label>
                        <div className="input-group">
                            <PlacesAutoCompleteComponent fillForm={(addressType, val) => this.fillForm(addressType, val)} desired={this.state.desiredAddress} currentLocation={this.props.currentLocation} locationData={(data) => this._newLocationData(data)} address={(e, isCurrent, done) => this.desiredAddress(e, isCurrent, done)} inputClassName="form-control special"/>
                        </div>
                    </div>
                </div>
            </div>
          <div className="container-fluid map-section">
            <div className="row">
                <div className="col-xs-12 col-sm-6 text-center settings find-gym" style={{maxHeight: '100vh', overflow: 'scroll'}}>
                    <AddressForm gyms={this.props.bookingState.gyms} addressType={this.state.addressType} addressValue={this.state.addressValue} locationData={this.state.locationData} desiredAddress={this.state.desiredAddress} onLocationSelected={(location) => {
                        this.props.onChooseLocation(location)
                    }
                    }/>
                </div>
              <div className="col-xs-12 col-sm-6 hidden-xs hidden-sm kill-left-padding kill-right-padding">
                  <GymsMap newLocationData={this.state.locationData} isCurrent={this.state.isCurrent} onLocationSelected={(location) => {
                      this.props.onChooseLocation(location)}} markers={this.props.bookingState} />
              </div>
            </div>
          </div>
        </div>
    );
  }

  _renderPrevCards() {
    if(!this.props.bookingState.sessionLocations.length) {
      return (
        <div className="col-xs-12 col-sm-6 col-md-offset-3 text-center">
            <h3>No Previous Locations Available</h3>
        </div>
      )
    } else {
      return this.props.bookingState.sessionLocations.map(loc => {
              if(loc.gym) {
                return (
                <div key={loc.id} className="col-xs-12 col-sm-6 col-md-3" onClick={() => this.props.onChooseLocation(loc.gym)}>
                    <GymInfoCard {...loc.gym}/>
                </div>
                );
              } else {
                return (
                <div key={loc.date} className="col-xs-12 col-sm-6 col-md-3" onClick={() => this.props.onChooseLocation(loc)}>
                    <CustomLocationCard {...loc}/>
                </div>
                );
              }

          });
    }
  }
  _renderPrevButtons() {
    return (
      <div>
        <div className="row text-center">
          <div className="col-xs-12 col-sm-6  col-sm-offset-3">
            <a href="javascript:void(0)" className="btn btn-info btn-lg btn-block" onClick={() => this.handleAddLocationClick()}>Add Location</a>
          </div>
        </div>
      </div>
    )
  }
  _renderPrevLocation() {
    return (
      <div className="container">
        {this._renderPrevCards()}
        {this._renderPrevButtons()}
      </div>
    )

  }
  handleOptionChange (changeEvent) {
    this.setState({
      selectedOption: changeEvent.target.value
    });
  }
  render() {
    const { gyms, locationPermission } = this.props
    return (
      <div className="booking-step-3">
        <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="text-center">
                <h2 className="fw500 marginBottom20">Choose Location</h2>
              </div>
          </div>
          <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center settings">
              <label htmlFor="prevLocation" className={"radio-inline trainerL " +
                (this.state.selectedOption === 'prevLocation' ? 'active' : '')}>
                <input id = "prevLocation" type="radio" value="prevLocation" className="trainer"
                              checked={this.state.selectedOption === 'option2'}
                              onChange={this.handleOptionChange.bind(this)} />
                Previous Location
              </label>
              <label htmlFor="newLocation" className={"radio-inline trainerL " +
              (this.state.selectedOption === 'newLocation' ? 'active' : '')}>
              <input id = "newLocation" type="radio" value="newLocation" className="trainer"
                              checked={this.state.selectedOption === 'option3'}
                              onChange={this.handleOptionChange.bind(this)} />
                New Location
              </label>
            </div>
          </div>
        </div>
        <div className="row">
            {this.renderLocation()}
        </div>
      </div>
    )
  }
}

export default ChooseLocation
