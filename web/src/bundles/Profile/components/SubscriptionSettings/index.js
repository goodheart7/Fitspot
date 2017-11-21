import React from 'react';
import LeftMenu from '@Profile/components/LeftMenu';
import moment from 'moment';
import {times} from 'lodash';
import { connect } from 'react-redux';
import { setUserTypeCustomer, setUserTypeTrainer } from '@store/modules/auth/actions';
import { fetchPlans } from '@store/modules/plans/actions';
import ChoosePlan from '@Booking/components/ChoosePlan'

import { fetchWorkouts } from '@store/modules/workouts/actions';
import { subscribePlan, selectPlan } from '@store/modules/subscription/actions';
import * as Actions from '@shared/actions';

class SubscriptionSettings extends React.Component {
    constructor(props) {
        super(props);
        this.onChoosePlan = this.onChoosePlan.bind(this);
        this.onChooseSingleWorkout = this.onChooseSingleWorkout.bind(this);
    }

  renderRemainingWorkoutStrips(numWorkoutsLeft, numWorkoutsAvailable) {
    var diff = numWorkoutsAvailable - numWorkoutsLeft;
    var grey = diff < 0 ? 0 : diff;
    var green = diff < 0 ? numWorkoutsAvailable:  numWorkoutsLeft;
    let stripItems = [];
    _.times(grey, (i) => {
      stripItems.push(<div key={i} className="col-xs-3 workout-indicator">
           <p className="">&nbsp;</p>
       </div>);
    });
    _.times(green, (i) => {
      stripItems.push(<div key={i + grey} className="col-xs-3 workout-indicator">
          <p className="active">&nbsp;</p>
      </div>);
    });
    return(stripItems)
  }
    onChoosePlan(plan) {
        this.props.selectPlan(plan);
        Actions.addSubscription();
    }
    onChooseSingleWorkout(plan) {
        this.props.activateSinglePurchaseBooking();
        Actions.addFriends();
    }
    renderPlans() {
        if (this.props.workoutInfo &&  this.props.workoutInfo.numWorkoutsLeft > 0
            &&  this.props.workoutInfo.isActive) {
            return;
        }
        return (
            <div>
                <hr className="section-devider"/>
                <div className="fit-cards-profile">
                    <ChoosePlan
                        homeLook
                        title = 'Subscribe and Save!'
                        showSingleWorkout = {false}
                        onChoosePlan = {this.onChoosePlan}
                        onChooseSingleWorkout = {this.onChooseSingleWorkout}
                        {...this.props}
                    />
                </div>
            </div>
        )
    }
  render() {
    var workoutInfo = this.props.user.workoutInfo;
    if(!workoutInfo || !workoutInfo.isActive) {
      return (
        <div className="container">
          <div className="row">
            <LeftMenu activeIndex={2}/>
            <div className="col-xs-12 col-sm-9">
              <h2 className="text-center">You do not have any active subscription.</h2>
              <div className="row">
                  {this.renderPlans()}
              </div>
            </div>
          </div>
        </div>
      );
    }
    var validity = moment(workoutInfo.nextBillingDate).format("MMMM Do");
    var numWorkoutsLeft = workoutInfo.numWorkoutsLeft;
    var numWorkoutsAvailable = workoutInfo.plan.numWorkouts
    var remainingWorkouts = numWorkoutsLeft + " of " + numWorkoutsAvailable
    return(
      <div className="container">

  	<div className="row">

              <LeftMenu activeIndex={2}/>

              <div className="col-xs-12 col-sm-6">

                  <h2 className="text-center marginBottom50">Subscription Settings</h2>

                  <div className="col-xs-12 kill-left-padding kill-right-padding marginBottom20">

  		               <div className="subscribe-package text-center">

                      <h4><strong>{workoutInfo.plan.name}</strong></h4>
                      <p className="col-xs-6"><small>Workouts</small><strong>{workoutInfo.plan.numWorkouts}</strong>/month</p>
                      <p className="col-xs-6"><small>-30% off</small><strong>${workoutInfo.plan.pricePerWorkout}</strong>/workout</p>

                    </div>

                  </div>

                  <h3 className="text-center marginBottom20">My Workouts</h3>

                  <p className="text-center marginBottom20">{remainingWorkouts} workouts remaining until {validity}</p>

                  {this.renderRemainingWorkoutStrips(numWorkoutsLeft, numWorkoutsAvailable)}

                  <p className="marginBottom20">&nbsp;</p>

                  <div className="col-xs-6 kill-left-padding">

                    <button type="button" className="btn btn-danger btn-lg btn-block"
                      onClick={this.props.onCancelPlan}>Cancel Subscription</button>
                  </div>

                  <div className="col-xs-6 kill-right-padding">

                      <button type="button" className="btn btn-info btn-lg btn-block" disabled="true">Edit Subscription</button>

                  </div>

              </div>

          </div>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        userType: state.auth.user.userType,
        workoutInfo: state.auth.user.workoutInfo,
        appSettings: state.auth.appSettings,
        activities: state.auth.appSettings.activities,
        workouts: state.workouts,
        plans : state.plans.planItems,
        bookingState: state.booking,
        isLoggedIn: state.auth.loggedIn,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPlans: () => {
            dispatch(fetchPlans());
        },
        fetchWorkouts: () => {
            dispatch(fetchWorkouts());
        },
        setUserTypeCustomer: () => {
            dispatch(setUserTypeCustomer());
        },
        setUserTypeTrainer: () => {
            dispatch(setUserTypeTrainer());
        },
        selectPlan: (plan) => {
            dispatch(selectPlan(plan))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionSettings);
