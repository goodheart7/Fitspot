import React from 'react';
import moment from 'moment'
import * as Actions from '@shared/actions';
import BraintreeDropIn from '@shared/integrations/braintree/BraintreeDropIn';
import ApplyPromoForm from './ApplyPromoForm';

class ReviewWorkout extends React.Component {

  render() {
    let workoutInfo = this.props.workoutInfo ? this.props.workoutInfo : {};
    var bookingState = this.props.bookingState;
    var appSettings = this.props.appSettings;
    var customerPrice = this.props.customerPrice;
    var activityName = bookingState.chosenActivity.name;
    var dateTime= moment(bookingState.chosenDate).local().format("MMM DD h:mm a");
    var location = bookingState.chosenLocation.name;
    var trainerName = bookingState.chosenTrainer.firstName + " " + bookingState.chosenTrainer.lastName.slice(0,1)
    var workoutType = bookingState.isSinglePurchase  ? 'Single Workout' : bookingState.subscriptionOption.name
    var numFriends = bookingState.numFriends;
    //var totalFriendPrice = bookingState.numFriends * appSettings.priceFriend
    var numWorkouts = bookingState.isSinglePurchase ? 1 : bookingState.subscriptionOption.numWorkouts;
    //var basePrice = bookingState.isSinglePurchase ? appSettings.priceBase : bookingState.subscriptionOption.pricePerWorkout
    var basePrice = bookingState.isSinglePurchase ? bookingState.customerPrice.sessionBaseCost :
      bookingState.customerPrice.customerPays;
    var packagePrice = appSettings.priceBase * numWorkouts;
    var totalFriendPrice = customerPrice.friendsCost;
    var totalCharge = bookingState.customerPrice.customerPays;
    var percentDiscount = workoutInfo.hasOwnProperty('plan') ? 100 - Math.ceil(((this.props.workoutInfo.plan.price / packagePrice)* 100)) : null;

    return (
      <div className="container">

    <div className="row">

          <div className="col-xs-12 col-sm-6 col-sm-offset-3">

            <h2 className="text-center marginBottom20">Review Workout</h2>

            <div className="workout-row">

              <h4><small>ACTIVITY</small>{activityName}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseActivity}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>DATE & TIME</small>{dateTime }</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseDateTime}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>LOCATION</small>{location}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseLocation}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>TRAINER</small>{trainerName}</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.chooseTrainer}>Change</a>

            </div>

            <div className="workout-row">

              <h4><small>TYPE</small>{workoutType}</h4>
                { !bookingState.isSinglePurchase ? `Workouts ${numWorkouts} with ${percentDiscount}% discount` : '' }
              {bookingState.isSinglePurchase ?
                <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.choosePlan}>Change</a>
                :
                <div></div>
              }
            </div>

            <div className="workout-row marginBottom20">

              <h4><small>FRIENDS</small>+{numFriends} Participants</h4>
              <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={Actions.addFriends}>Change</a>

            </div>

            <h2 className="text-center marginBottom20">Order Summary</h2>

            <div className="subscribe-section">
            { customerPrice.freeWorkoutCount > 0 ?

              <div className="subscribe-row">

                <p className="subscribe-row-free-workouts">Free Workouts Remaining<strong><span>{customerPrice.freeWorkoutCount}</span></strong></p>

              </div>
              :
              <div></div>
            }
            <div className="subscribe-row">

              <p>1 Workout <span>${basePrice}</span></p>

            </div>
            <div className="subscribe-row">

              <p>+{numFriends} Friends<span>+ ${totalFriendPrice}</span></p>

            </div>
            <div className="subscribe-row">

              <p>Transaction Fee<span>{ Math.ceil((basePrice + totalFriendPrice ) *  (customerPrice.transactionFee -1) * 100) / 100}</span></p>

            </div>
            <ApplyPromoForm onSubmit={this.props.applyPromo}/>
            <div className="subscribe-row" style={{paddingTop: 0}}>

              <p style={{fontSize: 'x-large'}}><strong>YOU PAY <span>${totalCharge }</span></strong></p>

            </div>

            </div>

            <form style={{paddingTop: 38}}>
                <h2 className="text-center marginBottom20">Credit Card</h2>
                <BraintreeDropIn clientToken={appSettings.braintreeClientToken} ref="braintree" />
                {/*<button type="submit" className="btn btn-info btn-lg btn-block">Purchase Workout</button>*/}
                <a href="#" className="btn btn-info btn-lg btn-block" disabled={bookingState.isFetching}
                  onClick={() => this.props.requestNewWorkout(numFriends, "")}>{bookingState.isFetching && <span><i className="fa fa-spinner fa-spin fa-3x fa-fw" /><span className="sr-only">Loading...</span></span>}{bookingState.isFetching ? 'Purchasing Workout' : 'Purchase Workout'}</a>

            </form>

          </div>

      </div>

  </div>
    );
  }

}

export default ReviewWorkout;
