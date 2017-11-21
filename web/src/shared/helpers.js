import moment from 'moment';


export const toRestDate = (date) => {
  return moment(new Date(date)).format('YYYY-MM-DD');
};

export const nearestBookingTime = () => {
  var start = moment().add(100, 'minutes');
  var remainder = 30 - start.minute() % 30;
  var nextBookingTime = moment(start).add("minutes", remainder );
  return nextBookingTime.utc();
}
