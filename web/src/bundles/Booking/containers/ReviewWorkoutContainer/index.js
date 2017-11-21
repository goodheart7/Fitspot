import React, {Component} from 'react'
import {connect} from 'react-redux'
import ReviewWorkout from '@Booking/components/ReviewWorkout'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { estimatePrice, bookingResetState, setCurrentStep } from '@store/modules/booking/actions'
import { addWorkout } from '@store/modules/workouts/actions'
import {isEmpty} from 'lodash';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';
import events from '@utils/Events';

type Props = {
  bookingState: Object,
  workout: Object,
  error: String,
  lastPaymentString:String,
  workoutInfo: Object,
  estimatePrice: Function,
};

class ReviewWorkoutContainer extends Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      promocode: '',
      isEditing: false,
      paymentToken: [],
      paymentString: props.lastPaymentString,
      estimateSuccessful: false,
      isShowingModal: false,
      bookingError: '',
      message: '',
      shouldPush: false
    };
    this.requestNewWorkout = this.requestNewWorkout.bind(this);
    this.applyPromo = this.applyPromo.bind(this);
  }
  handleClose = () => {
    this.setState({isShowingModal: false, bookingError: '', message: '', shouldPush: false});
    if(this.state.shouldPush){
      browserHistory.push('/')
    }
  };
  componentDidMount() {
    this.props.setCurrentStep(this.props.bookingState.totalSteps);
    this.processPromo();
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.error.length > 0){
      this.setState({
        bookingError: nextProps.error,
        isShowingModal: true
      })
    } else if(nextProps.bookingState.error && nextProps.bookingState.error.length > 0){
      this.setState({
        bookingError: nextProps.bookingState.error,
        isShowingModal: true
      });
    } else if(!nextProps.error && nextProps.customerPrice && !this.state.estimateSuccessful ) {
      //alert("Estimated workout successfully")
      this.setState({estimateSuccessful: true});
    } else if (!isEmpty(nextProps.newWorkout)) {
      var retString = 'We’ve sent the workout details to '+ this.props.bookingState.chosenTrainer.firstName + ', and we’re waiting for confirmation. We’ll notify you when they do.'
      if(this.props.bookingState.chosenTrainer.id == -1){
        retString = "Thank you for using Fitspot Choose! We're finding the best trainer for you. We will notify you when they reply."
      }
      var workoutInfo = this.props.workoutInfo;
      var subDetailsText= '';
      if(this.props.bookingState.isSinglePurchase){
        subDetailsText = 'Thank you for your purchase!'
      } else if(!workoutInfo.isActive){ //not active but has some left over.
        if((workoutInfo.numWorkoutsLeft - 1 == 0)){
          subDetailsText = 'No workouts left, thank you for using Fitspot.'
        }else{
          subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' workouts left before your subscription is over.'
        }
      }else{
        subDetailsText = (workoutInfo.numWorkoutsLeft - 1) + ' out of ' + workoutInfo.plan.numWorkouts + ' pre-paid workouts remaining.'
      }
      this.setState({
        message: retString + "\n\n" + subDetailsText,
        isShowingModal: true,
        shouldPush: true
      });
    }
  }
  applyPromo(form) {
    this.setState({estimateSuccessful: false});
    this.processPromo(form.promocode);
  }
  processPromo(promocode) {
    const {bookingState} = this.props;
    this.props.estimatePrice(bookingState.chosenLocation.lat,
        bookingState.chosenLocation.lon,
        20, bookingState.chosenLocation.id, bookingState.chosenDate.utc().format(),
        bookingState.numFriends, promocode, !bookingState.isSinglePurchase, bookingState.workoutType)
  }
  requestNewWorkout(numberOfFriends,promocode){

    const {bookingState} = this.props;
    this.refs.review.refs.braintree.tokenize().then((data) => {
      console.log('BT Data: ', data);
      var payload = {
        workoutType: bookingState.workoutType,
        lat: bookingState.chosenLocation.lat,
        lon: bookingState.chosenLocation.lon,
        radius: 50,
        date: bookingState.chosenDate,
        numFriends: numberOfFriends,
        activityId: bookingState.chosenActivity.id,
        shouldUsePurchasedPlan: !bookingState.isSinglePurchase,
        address: bookingState.chosenLocation.address,
        city: bookingState.chosenLocation.city,
        state: bookingState.chosenLocation.state,
        zipcode: bookingState.chosenLocation.zipcode,
        promocode: undefined,
        paymentNonce: data.nonce,
      }

      if(bookingState.chosenTrainer.id !== -1){
        payload['trainerId'] = bookingState.chosenTrainer.id
      }
      if(bookingState.chosenLocation.id > 0){
        payload['gymId'] = bookingState.chosenLocation.id
      }

      this.props.addWorkout(payload);

      events.bookingDone(bookingState.bookingType);

    });

  }
  render() {
    return (
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer  onClose={this.handleClose}>
              <ModalDialog className="react-modal" onClose={this.handleClose}>
                <h1>{this.state.bookingError ? 'Error' : 'Workout Requested!'}</h1>
                <p>{this.state.bookingError ? this.state.bookingError : this.state.message}</p>
              </ModalDialog>
            </ModalContainer>
          }
          <ReviewWorkout ref="review"
              {...this.props} requestNewWorkout= {this.requestNewWorkout} applyPromo={this.applyPromo}/>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    bookingState: state.booking,
    appSettings: state.auth.appSettings,
    error : state.workouts.error,
    newWorkout : state.workouts.newWorkout,
    workoutItems: state.workouts.workoutItems,
    workoutInfo: state.auth.user.workoutInfo,
    customerPrice: state.booking.customerPrice,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addWorkout: (payload) => {
      dispatch(addWorkout(payload))
    },
    bookingResetState: () => {
      dispatch(bookingResetState())
    },
    estimatePrice: (lat, lon, radius, gymId, dateTime, numFriends, promoCode, usePrepaidSession, workoutType) => {
      dispatch(estimatePrice(lat, lon, radius, gymId, dateTime, numFriends, promoCode, usePrepaidSession, workoutType))
    },
    setCurrentStep: (step) => {
      dispatch(setCurrentStep(step))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ReviewWorkoutContainer)
