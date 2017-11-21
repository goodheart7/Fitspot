const config = require('@config');
import AsyncStorage from '@platform/asyncStorage';
import Platform from '@platform/platform';
import Analytics from 'analytics-react-native';
const analytics = new Analytics(config.segmentAPIKey, {
  host : 'https://api.segment.io',
  flushAt : 20,
  flushAfter : 10000
});
import { uuid } from '@utils/uuid';
import CONSTS from '@utils/Consts';

const USER_ID_KEY = 'userId';

class Events {

  constructor() {
    if ( !Events.instance ) {
      Events.instance = this;
      this.uid = uuid();
      this.id_is_anon = true;
      this.used_anon_id = false;
      this.user_has_identified = false;
      this.platform = Platform.OS;
			this.platformPrefix = (Platform.OS.toUpperCase() + ": ")
      AsyncStorage.getItem(USER_ID_KEY)
        .then((id) => {
          if (id !== null) {
            this._setUID(id);
          }
        }).catch();
    }
    return Events.instance;
  }

  _setUID(newUID) {
    newUID = Number(newUID);
    if (newUID !== this.uid) {
      if (this.user_has_identified && this.used_anon_id) {
        analytics.alias({
          previousId: this.uid,
          userId: newUID
        });
      }
      this.uid = newUID;
      this.id_is_anon = false;
      this.user_has_identified = true;
      AsyncStorage.setItem(USER_ID_KEY, JSON.stringify(newUID)).catch();
    }
  }

  _identify(traits) {
    analytics.identify({
      userId : this.uid,
      traits
    });
  }

  page(name, props = {}) {
    analytics.page({
      userId : this.uid,
      name : name,
      properties : props
    });
  }

  screen(name, props = {}) {
    analytics.screen({
      userId : this.uid,
      name : name,
      properties : props
    });
  }

  track(event, props = {}) {
    props['platform'] = this.platform;
    analytics.track({
      userId : this.uid,
      event  : (this.platformPrefix + event),
      properties : props
    });
  }

  login(user) {
    this._setUID(user.id);
    this._identify({
      email : user.email,
      user : user
    });
  }

  update(user) {
    this._setUID(user.id);
    this._identify({
      email : user.email,
      user : user
    });
    this.track("User Updated Profile");
  }

  bookingTrack(event, props, bookingType) {
    props['bookingType'] = (bookingType == CONSTS.BOOKING_TYPE.BY_ACTIVITY ? 'BBA' : 'BBT');
    this.track(event, props);
  }

  bookingChoseActivity(bookingType, activity) {
    this.bookingTrack("Workout Type Chosen", {
      'workoutType' : activity
    }, bookingType);
  }

  bookingChoseDT(bookingType, date, time) {
    this.bookingTrack("Date & Time Chosen", {
      'date' : date,
      'time' : time
    }, bookingType);
  }

  bookingChoseLocation(bookingType, loc) {
    this.bookingTrack("Location Chosen", {
      'location' : loc
    }, bookingType);
  }

  bookingNoGyms(bookingType, view, loc) {
    this.bookingTrack("No Gyms Found", {
      'view' : view,
      'location' : loc
    }, bookingType);
  }

  bookingTrainerSearch(bookingType, query) {
    this.bookingTrack("Searched for Trainer", {
      'query' : query
    }, bookingType);
  }

  bookingChoseTrainer(bookingType, trainerName) {
    this.bookingTrack("Trainer Selected", {
      'trainerName' : trainerName
    }, bookingType);
  }

  bookingChosePlan(bookingType, planName) {
    this.bookingTrack("Workout Package Selected", {
      'package' : planName
    }, bookingType);
  }

  bookingEnteredCard(bookingType) {
    this.bookingTrack("Credit Card Entered", {}, bookingType);
  }

  bookingDone(bookingType) {
    this.bookingTrack("Workout Booked", {}, bookingType);
  }

}

let events = new Events();
export default events;
