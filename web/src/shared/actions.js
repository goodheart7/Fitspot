import {browserHistory} from 'react-router';

export const BOOKING_CHOOSE_ACTIVITY_URL = '/booking/choose-activity/';
export const CALENDAR_ACTIVITIES_URL = '/calendar/activities/';
export const PROFILE_URL = '/profile/';
export const PROFILE_ACCOUNT_SETTINGS_URL = '/profile/account-settings/';
export const PROFILE_SUBSCRIPTION_SETTINGS_URL = '/profile/subscription-settings/';
export const PROFILE_EDIT = '/profile/edit/';
export const USER_LOGOUT_URL = '/user/logout/';
export const COMPANY_ADMIN_INTERFACE = 1;
export const PERSONAL_INTERFACE = 0;

export const navigateTo = (path) => {
  browserHistory.push(path);
};

export const home = () => {
  browserHistory.push('/');
};

export const userAuth = (next) => {
  let url = '/user/auth/';

  if (next) {
    url += `?next=${next}`;
  }

  browserHistory.push(url);
};

export const userLogin = (next) => {
  let url = '/user/login/';

  if (next) {
    url += `?next=${next}`;
  }

  browserHistory.push(url);
};

export const userLogout = (next) => {

  browserHistory.push('/user/logout/');
};

export const userMoreInfo = (next) => {
  let url = '/user/more-info/';
  browserHistory.push(url);
};

export const userRegister = () => {
  browserHistory.push('/user/register/');
};

export const userForgotPassword = () => {
  browserHistory.push('/user/forgot-password/');
};


export const userVerify = () => {
  browserHistory.push('/user/verify/');
};

export const customerOnboarding = () => {
  browserHistory.push('/customer/onboard/');
};

export const chooseActivity = () => {
  browserHistory.push('/booking/choose-activity/');
};

export const chooseDateTime = () => {
  browserHistory.push('/booking/choose-datetime/');
};

export const chooseLocation = () => {
  browserHistory.push('/booking/choose-location/');
};

export const calendar = () => {
  browserHistory.push('/calendar/activities/');
};

export const chooseTrainer = () => {
  browserHistory.push('/booking/choose-trainer/');
};
export const bookByTrainer = () => {
  browserHistory.push('/booking/choose-trainer/?book=1');
};

export const choosePlan = () => {
  browserHistory.push('/booking/choose-plan/');
};

export const addFriends = () => {
  browserHistory.push('/booking/add-friends/');
};

export const reviewWorkout = () => {
  browserHistory.push('/booking/review-workout/');
};

export const editWorkout = () => {
  browserHistory.push('/booking/edit-workout/');
};

export const addSubscription = () => {
  browserHistory.push('/subscribe/add-subscription/');
};

export const viewProfile = () => {
  browserHistory.push('/profile/');
};

export const editProfile = () => {
  browserHistory.push('/profile/edit/');
};

export const accountSettings = () => {
  browserHistory.push('/profile/account-settings/');
};

export const subscriptionSettings = () => {
  browserHistory.push('/profile/subscription-settings/');
};

export const chat = () => {
  browserHistory.push('/chat/message/');
};

export const customerSupport = () => {
  window.location.href = "mailto:info@fitspotapp.com?subject=Your%20Subject&body=Your%20message%20goes%20here";
};
export const refer = (user) => {
  window.location.href = 'mailto:?body=Use%20code:' + user + '&subject=Check%20out%20Fitspot'
};
export const viewWebsite = () => {
  window.location.href = "http://www.fitspotapp.com"
};

export const earnFreeWorkouts = () => {
  window.location.href = "http://www.fitspotapp.com/refer-employers/"
}
