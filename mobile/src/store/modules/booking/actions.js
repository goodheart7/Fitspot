import CONSTS from '@utils/Consts'
import moment from 'moment'
import ApiUtils from '@utils/ApiUtils'

export const BOOKING_RESET_STATE = "BOOKING_RESET_STATE"
export const ADD_FRIENDS = "ADD_FRIENDS"
export const SET_BOOKING_TYPE = "SET_BOOKING_TYPE"
export const SET_WORKOUT_TYPE = "SET_WORKOUT_TYPE"
export const SELECT_TRAINER = "SELECT_TRAINER"
export const SELECT_ACTIVITY = "SELECT_ACTIVITY"
export const SELECT_DATETIME = "SELECT_DATETIME"
export const SELECT_LOCATION = "SELECT_LOCATION"
export const BEGIN_EDITING = "BEGIN_EDITING"
export const END_EDITING = "END_EDITING"
export const ACTIVATE_SINGLE_PURCHASE = 'ACTIVATE_SINGLE_PURCHASE'
export const ADD_BOOKING_NONCE = 'ADD_BOOKING_NONCE'

export const FETCH_GYMS = 'FETCH_GYMS';
export const FETCH_GYMS_SUCCESS = 'FETCH_GYMS_SUCCESS';
export const FETCH_GYMS_FAIL = 'FETCH_GYMS_FAIL';

export const SESSION_LOCATIONS = 'SESSION_LOCATIONS';
export const SESSION_LOCATIONS_SUCCESS = 'SESSION_LOCATIONS_SUCCESS';
export const SESSION_LOCATIONS_FAIL = 'SESSION_LOCATIONS_FAIL';

export const FETCH_TRAINERS = 'FETCH_TRAINERS';
export const FETCH_TRAINERS_SUCCESS = 'FETCH_TRAINERS_SUCCESS';
export const FETCH_TRAINERS_FAIL = 'FETCH_TRAINERS_FAIL';

export const SEARCH_TRAINERS_AVAILABILITIES = 'SEARCH_TRAINERS_AVAILABILITIES';
export const SEARCH_TRAINERS_AVAILABILITIES_TIME = 'SEARCH_TRAINERS_AVAILABILITIES_TIME';
export const SEARCH_TRAINERS_AVAILABILITIES_SUCCESS = 'SEARCH_TRAINERS_AVAILABILITIES_SUCCESS';
export const SEARCH_TRAINERS_AVAILABILITIES_FAIL = 'SEARCH_TRAINERS_AVAILABILITIES_FAIL';

export const ESTIMATE_PRICE = 'ESTIMATE_PRICE';
export const ESTIMATE_PRICE_SUCCESS = 'ESTIMATE_PRICE_SUCCESS';
export const ESTIMATE_PRICE_FAIL = 'ESTIMATE_PRICE_FAIL';

export const SET_SUBSCRIPTION_OPTION = 'SET_SUBSCRIPTION_OPTION';

export const GET_TRAINER_AVAIL_SUCCESS = 'GET_TRAINER_AVAIL_SUCCESS';

export const INCREASE_CURRENT_STEP = 'INCREASE_CURRENT_STEP';
export const SET_CURRENT_STEP = 'SET_CURRENT_STEP';

export const CHOOSE_DATE_TIME_STEP = 1;
export const CHOOSE_LOCATION_STEP = 2;
export const CHOOSE_TRAINER_STEP = 3;
export const CHOOSE_PLAN_STEP = 4;
export const ADD_FRIENDS_STEP = 5;

export function increaseCurrentStep() {
  return {
    type: INCREASE_CURRENT_STEP,
    receivedAt: Date.now()
  }
};

export function setCurrentStep (step) {
  return {
    type: SET_CURRENT_STEP,
    receivedAt: Date.now(),
    step: step
  }
}

export function bookingResetState() {
  return {type: BOOKING_RESET_STATE, receivedAt: Date.now()};
}

export function setBookingType(bookingType){
  return {type: SET_BOOKING_TYPE, bookingType:bookingType, receivedAt: Date.now()}
}
export function setWorkoutType(workoutType){
  return {type: SET_WORKOUT_TYPE, workoutType:workoutType, receivedAt: Date.now()}
}

export function addSubscriptionOption(option){
  return {type: SET_SUBSCRIPTION_OPTION, option:option, receivedAt: Date.now()}
}

export function selectTrainer(trainer){
  return {type: SELECT_TRAINER, trainer:trainer, receivedAt: Date.now()}
}

export function selectActivity(activity){
  return {type: SELECT_ACTIVITY, activity:activity, receivedAt: Date.now()}
}

export function selectDateTime(dateTime){
  return {type: SELECT_DATETIME, dateTime:dateTime, receivedAt: Date.now()}
}

export function selectLocation(location){
  return {type: SELECT_LOCATION, location:location, receivedAt: Date.now()}
}
export function addFriends(numFriends){
  return {type: ADD_FRIENDS, numFriends:numFriends, receivedAt: Date.now()}
}
export function beginEditingBooking(){
  return {type: BEGIN_EDITING,receivedAt: Date.now()}
}

export function endEditingBooking(){
  return {type: END_EDITING, receivedAt: Date.now()}
}

export function activateSinglePurchaseBooking(){
  return {type: ACTIVATE_SINGLE_PURCHASE, receivedAt: Date.now()}
}

export function addBookingNonce(nonce){
  return {type: ADD_BOOKING_NONCE, nonce, receivedAt: Date.now()}
}
export function fetchGymsSuccess(jsonBody){
  return { type: FETCH_GYMS_SUCCESS, gyms: jsonBody, receivedAt: Date.now()}
}

export function fetchGymsFail(message){
  return { type: FETCH_GYMS_FAIL, message, receivedAt: Date.now()}
}
export function fetchSessionLocationsSuccess(jsonBody){
  return { type: SESSION_LOCATIONS_SUCCESS, sessionLocations: jsonBody, receivedAt: Date.now()}
}

export function fetchSessionLocationsFail(message){
  return { type: SESSION_LOCATIONS_FAIL, message, receivedAt: Date.now()}
}

export function fetchTrainersSuccess(jsonBody){
  return { type: FETCH_TRAINERS_SUCCESS, trainers: jsonBody, receivedAt: Date.now()}
}

export function fetchTrainersFail(message){
  return { type: FETCH_TRAINERS_FAIL, message, receivedAt: Date.now()}
}
export function searchTrainerAvailabilitiesTime(time){
  return { type: SEARCH_TRAINERS_AVAILABILITIES_TIME, time, receivedAt: Date.now()}
}
export function searchTrainerAvailabilitiesSuccess(jsonBody){
  return { type: SEARCH_TRAINERS_AVAILABILITIES_SUCCESS, trainers: jsonBody, receivedAt: Date.now()}
}

export function searchTrainerAvailabilitiesFail(message){
  return { type: SEARCH_TRAINERS_AVAILABILITIES_FAIL, message, receivedAt: Date.now()}
}

export function estimatePriceStart(){
  return { type: ESTIMATE_PRICE, receivedAt: Date.now()}
}
export function estimatePriceSuccess(jsonBody){
  return { type: ESTIMATE_PRICE_SUCCESS, customerPrice: jsonBody, receivedAt: Date.now()}
}

export function estimatePriceFail(message){
  return { type: ESTIMATE_PRICE_FAIL, message, receivedAt: Date.now()}
}

export function getTrainerAvailabilitySuccess(jsonBody){
  return { type: GET_TRAINER_AVAIL_SUCCESS, availability: jsonBody, receivedAt: Date.now()}
}

export function fetchGyms(lat, lon, radius) {
  return function(dispatch) {
    return ApiUtils.get('gyms/list?lat=' + lat + '&lon=' + lon + '&radius=' + radius)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(fetchGymsSuccess(jsonBody));
      } else {
        dispatch(fetchGymsFail(jsonBody.message));
      }
    }).catch(err => {
      console.log('Error fetching gyms: ', err);
    })
  }
}

export function fetchSessionLocations() {
  return function(dispatch) {
    return ApiUtils.get('customers/session-locations')
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(fetchSessionLocationsSuccess(jsonBody));
      } else {
        dispatch(fetchSessionLocationsFail(jsonBody.message));
      }
    }).catch(err => {
      console.log('Error fetching session locations: ', err);
    })
  }
}
export function fetchTrainers(lat, lon, radius) {
  return function(dispatch) {
    return ApiUtils.get('trainers/list?lat=' + lat + '&lon=' + lon + '&radius=' + radius)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(fetchTrainersSuccess(jsonBody));
      } else {
        dispatch(fetchTrainersFail(jsonBody.message));
      }
    }).catch(err => {
      console.log('Error fetching trainers: ', err);
    })
  }
}
export function searchTrainerAvailabilities(lat, lon, radius, activityId, dateTime) {
  return function(dispatch) {
    dispatch(searchTrainerAvailabilitiesTime(dateTime))
    return ApiUtils.get('availability/search?lat=' + lat + '&lon=' + lon + '&radius='
                          + radius + (activityId ? '&activity_id='+ activityId : '')
                          + '&datetime=' + dateTime)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(searchTrainerAvailabilitiesSuccess(jsonBody));
      } else {
        dispatch(searchTrainerAvailabilitiesFail(jsonBody.message));
      }
    }).catch(err => {
      console.log('Error searching trainer availabilities: ', err);
    })
  }
}
export function estimatePrice(lat, lon, radius, gymId, dateTime, numFriends, promoCode, prepaidSession, workoutType) {
  return function(dispatch) {
    dispatch(estimatePriceStart());
    return ApiUtils.get('workouts/estimate-price?lat=' + lat + '&lon=' + lon + '&radius='
                          + radius + '&gym_id='+ gymId
                          + '&dt=' + dateTime
                          + '&numFriends=' + numFriends
                          + (promoCode ? '&promocode=' + promoCode : '')
                          + (prepaidSession ? '&usePrepaidSession=' + prepaidSession : '')
                          + '&workoutType=' + workoutType)
    .then(([response, jsonBody]) => {
      if (response.status == 200) {
        dispatch(estimatePriceSuccess(jsonBody));
      } else {
        dispatch(estimatePriceFail(jsonBody.message));
      }
    }).catch(err => {
      console.log('Error estimating workout price: ', err);
    })
  }
}
export function getTrainerAvailability(trainer){
  return function(dispatch) {
    return ApiUtils.get('availability/trainer-available/'+trainer.id)
    .then(([response, jsonBody]) => {
      console.log(response);
      console.log(jsonBody);
      if (response.status == 200) {
        dispatch(getTrainerAvailabilitySuccess(jsonBody));
      } else {
        Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Availability Error',
          detailsText: 'Error getting Trainer Availability: '+ jsonBody.message,
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
        )

      }
    }).catch(err => {
      console.log('Error fetching trainers: ', err);
    })
  }
}
