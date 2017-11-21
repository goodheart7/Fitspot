import React from 'react';
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';
import moment from 'moment'
import { find, sortBy } from 'lodash'
import * as Actions from '@shared/actions';
import CONSTS from '@utils/Consts';

type Props = {
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
};


class Launch extends React.Component {
  props: Props;

  constructor(props) {
    super(props);
    console.log(props)
    this.braintreeTest = this.braintreeTest.bind(this);
  }

  chooseTrainer() {
    this.props.setUserTypeTrainer();
    // TODO: Actions.home();
  }

  chooseCustomer() {
    this.props.setUserTypeCustomer();
    // TODO: Actions.home();
  }

  braintreeTest(event) {
    event.preventDefault();

    this.refs.braintree.tokenize().then((data) => {
      console.log('x', data);
    }).catch((err) => {
      console.log('y', err);
    });
  }

  renderUpcomingWorkouts() {
    //console.log(this.props);
    if(this.props.workouts.workoutItems.length == 0 || !this.props.isLoggedIn){
      return;
    }
    // Can we assume this to be sorted?
    var workout = sortBy(this.props.workouts.workoutItems, [function(w) { return moment(w.dtStart).unix() }])[0];
    var trainerName = workout.trainer ? workout.trainer.firstName + " "+  workout.trainer.lastName.slice(0,1) : 'Fitspot Choose';
    var dateTime = moment(workout.dtStart).format("MMM DD h:mm a");
    var activityName = find(this.props.appSettings.activities, function(act) {
      return act.id === workout.activityId;
    }).name;
    var nextWorkout = moment.duration(moment().diff(moment(workout.dtStart))).humanize();
    return(
        <div className="container">
          <div className="row">
              <div className="col-xs-12">
                <div className="text-center">
                    <h2>Your next workout starts in {nextWorkout}</h2>
                </div>
              </div>
          </div>
          <div className="row text-center" key={workout.id}>
            <div className="col-xs-12">
              <div className="subscribe-details text-center">
                  <p className="col-xs-6 col-md-3 info-boxes"><small>DATE & TIME</small><strong>{dateTime}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>TRAINER</small><strong>{trainerName}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>ACTIVITY</small><strong>{activityName}</strong></p>
                  <p className="col-xs-6 col-md-3 info-boxes"><small>LOCATION</small><strong>{workout.gym ? workout.gym.name: workout.address}</strong></p>
                  <p className="col-xs-12 text-center trainer-status">{workout.status == CONSTS.WORKOUT_STATUS.ACCEPTED ? 'Confirmed' : 'Pending Trainer Confirmation' }</p>
                  <p className="col-xs-6 text-center action-links"><a href="#" onClick={Actions.editWorkout}>Edit Workout</a></p>
                  { workout.trainer ? <p className="col-xs-6 text-center action-links"><a href="#" onClick={Actions.chat}>Chat With {trainerName}</a></p> :
                    <p className="col-xs-6 text-center action-links">Chat Unavailable</p>}
                </div>
            </div>
          </div>
          <hr className="section-devider"/>
        </div>
    );
  }

  render() {
    return (
      <div className="container">
          {this.renderUpcomingWorkouts()}
        {/* <h3>This is Braintree test</h3>

        <BraintreeDropIn clientToken={this.props.appSettings.braintreeClientToken} ref="braintree" />
        <a href="#" onClick={this.braintreeTest} className="btn btn-default">Submit</a>
        */}
      </div>
    );
  }
}

export default Launch;
