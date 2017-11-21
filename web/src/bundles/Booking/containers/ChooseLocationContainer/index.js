import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChooseLocation from '@Booking/components/ChooseLocation';
import { getLocationPermission } from '@store/modules/auth/actions';
import { selectLocation } from '@store/modules/booking/actions';
import ApiUtils from '@utils/ApiUtils';
import * as Actions from '@shared/actions';
import { fetchGyms, fetchSessionLocations, increaseCurrentStep, setCurrentStep, CHOOSE_LOCATION_STEP } from '@store/modules/booking/actions';
import CONSTS from '@utils/Consts'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import events from '@utils/Events';

type Props = {
  bookingState: Object,
  selectLocation: Function,
  getGyms: Function,
  locationPermission: boolean,
  getLocationPermission: Function,

}


class ChooseLocationContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      locationPermission: props.locationPermission,
      currentLocation: {},
      isShowingModal: false,
      refreshError: '',
      refreshDeclined: false
    };

  }

  refreshLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      var latitude = position.coords.latitude;
      var longitude = position.coords.longitude;
      //TODO: uncomment below line to remove hard-coded lat/lon
      var currentLocation = {lat: latitude, lon: longitude, radius: 10};
      //SFO lat/lon
      //var currentLocation = {lat : 37.5659448, lon:-122.01160010000001, radius: 10}
      //ATL lat/lon
      //var currentLocation = {lat: 33.8101512, lon: -84.4225184, radius: 10}
      this.setState({currentLocation: currentLocation});
      this.props.getGyms(latitude,longitude,20);
      this.props.fetchSessionLocations();
    }, (error) => {
      this.setState({refreshError: JSON.stringify(error)});
    }, {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 1000
    });
  }


  componentDidMount() {
    this.props.setCurrentStep(CHOOSE_LOCATION_STEP);
    if(this.props.locationPermission){
      this.refreshLocation();
    } else {
      this.props.getLocationPermission();
    }
  }

  componentWillUnmount(){
    this.props.increaseCurrentStep();
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.locationPermission){
      this.setState({locationPermission: nextProps.locationPermission});
      if(!this.state.currentLocation.lat)
        this.refreshLocation();
    }
  }

  chooseLocation(location){
    this.props.selectLocation(location);
    events.bookingChoseLocation(this.props.bookingState.bookingType, location);
    if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_TRAINER) {
      Actions.reviewWorkout();
    } else if(this.props.bookingState.bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY) {
      Actions.chooseTrainer();
    }

  }

  handleClose = () => {
    this.setState({isShowingModal: false});
  };

  render() {
    return (
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Error</h1>
                <p>{this.state.refreshError}</p>
              </ModalDialog>
            </ModalContainer>
          }
          <ChooseLocation
              {...this.props}
              currentLocation={this.state.currentLocation}
              locationPermission={ this.state.locationPermission }
              onChooseLocation={this.chooseLocation.bind(this)}
          />
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
    bookingState : state.booking,
    locationPermission : state.auth.locationPermission,
    gyms: state.booking.gyms,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLocation: (location) => {
      dispatch(selectLocation(location))
    },
    getLocationPermission: () => {
      dispatch(getLocationPermission());
    },
    getGyms: (lat, lon, radius) => {
      dispatch(fetchGyms(lat, lon, radius));
    },
    fetchSessionLocations: () => {
      dispatch(fetchSessionLocations());
    },
    increaseCurrentStep: () => {
      dispatch(increaseCurrentStep())
    },
    setCurrentStep: (step) => {
      dispatch(setCurrentStep(step))
    }
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(ChooseLocationContainer)
