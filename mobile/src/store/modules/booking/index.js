import CONSTS from '@utils/Consts'
import * as actions from './actions';

const initialState = {
  isFetching: false,
  bookingType: CONSTS.BOOKING_TYPE.UNDEFINED,
  workoutType: CONSTS.WORKOUT_TYPE.PRIVATE,
  chosenTrainer: {},
  chosenLocation: {},
  chosenDate: '',
  chosenActivity: {},
  sessionLocations: {},
  currentStep: 1,
  numFriends: 0,
  totalSteps: 6,
  isEditing: false,
  isSinglePurchase: false,
  singlePayNonce: '',
  singlePayDesc: '',
  trainers: [],
  gyms: [],
  customerPrice : {},
  subscriptionOption:{},
  trainerAvailability:[],
  trainerAvailabilityTime: {},
}

export default function auth(state = initialState,action){
  switch (action.type) {
    case actions.BOOKING_RESET_STATE:
      return {
        ...initialState,
        isFetching: false,
      };
    case actions.BEGIN_EDITING:
    return Object.assign({}, state, {
      isEditing: true
    })

    case actions.ACTIVATE_SINGLE_PURCHASE:
    return Object.assign({}, state, {
      isSinglePurchase: true,
      bookingType: CONSTS.BOOKING_TYPE.BY_ACTIVITY,
      subscriptionOption: {},
    })

    case actions.ADD_BOOKING_NONCE:
    return Object.assign({}, state, {
      singlePayNonce: action.nonce[0],
      singlePayDesc: action.nonce[1],
      isSinglePurchase: true,
    })

    case actions.ADD_FRIENDS:
    return Object.assign({}, state, {
      numFriends: action.numFriends
    })

    case actions.SET_SUBSCRIPTION_OPTION:
    return Object.assign({}, state, {
      subscriptionOption: action.option,
      isSinglePurchase: false,
    })

    case actions.BEGIN_EDITING:
    return Object.assign({}, state, {
      isEditing: false
    })

    case actions.FETCH_GYMS:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.FETCH_GYMS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      gyms: action.gyms
    })
    case actions.FETCH_GYMS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.SESSION_LOCATIONS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      sessionLocations: action.sessionLocations
    })
    case actions.SESSION_LOCATIONS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.FETCH_TRAINERS:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.FETCH_TRAINERS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      trainers: action.trainers
    })
    case actions.FETCH_TRAINERS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.SEARCH_TRAINERS_AVAILABILITIES:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.SEARCH_TRAINERS_AVAILABILITIES_TIME:
    return Object.assign({}, state, {
      trainerAvailabilityTime: action.time,
    })
    case actions.SEARCH_TRAINERS_AVAILABILITIES_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      trainers: action.trainers
    })
    case actions.SEARCH_TRAINERS_AVAILABILITIES_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.error
    })
    case actions.ESTIMATE_PRICE:
    return Object.assign({}, state, {
      isFetching: true,
      error: null,
    })
    case actions.ESTIMATE_PRICE_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      customerPrice: action.customerPrice
    })
    case actions.ESTIMATE_PRICE_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      error: action.message
    })

    case actions.GET_TRAINER_AVAIL_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      trainerAvailability: action.availability
    })

    case actions.SET_BOOKING_TYPE:
    return Object.assign({}, state, {
      bookingType: action.bookingType,
      isSinglePurchase: true,
    })

    case actions.SELECT_TRAINER:
    return Object.assign({}, state, {
      chosenTrainer: action.trainer,
    })

    case actions.SELECT_ACTIVITY:
    return Object.assign({}, state, {
      chosenActivity: action.activity,
    })

    case actions.SELECT_DATETIME:
    return Object.assign({}, state, {
      chosenDate: action.dateTime,
    })

    case actions.SELECT_LOCATION:
    return Object.assign({}, state, {
      chosenLocation: action.location,
    })

    case actions.INCREASE_CURRENT_STEP:
      console.log(state.currentStep++)
          return {
            ...state,
            currentStep: state.currentStep++
          };

    case actions.SET_CURRENT_STEP:
          return {
            ...state,
            currentStep: action.step
          };


    default:
      return state
  }
  return state;
}
