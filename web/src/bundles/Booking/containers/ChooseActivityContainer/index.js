import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChooseActivity from '@Booking/components/ChooseActivity'
import { setBookingType, selectActivity } from '@store/modules/booking/actions'
import CONSTS from '@utils/Consts'
import * as Actions from '@shared/actions';
import events from '@utils/Events'

type Props = {
  activities: Array,
  bookingState: Object,
  selectActivity: Function,
  setBookingType: Function,
}


class ChooseActivityContainer extends Component {

  props: Props
  constructor(props) {
    super(props);
    this.onChooseActivity = this.onChooseActivity.bind(this);
    this.onSelectBrowseTrainers = this.onSelectBrowseTrainers.bind(this);
  }
  onChooseActivity(activity) {
    if(this.props.bookingState.bookingType === CONSTS.BOOKING_TYPE.UNDEFINED) {
      this.props.setBookingType(CONSTS.BOOKING_TYPE.BY_ACTIVITY);
    }
    events.bookingChoseActivity(this.props.bookingState.bookingType, activity.name);
    this.props.selectActivity(activity);
    Actions.chooseDateTime();
  }

  onSelectBrowseTrainers() {
    this.props.setBookingType(CONSTS.BOOKING_TYPE.BY_TRAINER);
    Actions.bookByTrainer();
  }
  render() {
    return (
      <ChooseActivity {...this.props }
        onChooseActivity={this.onChooseActivity}
        onSelectBrowseTrainers={this.onSelectBrowseTrainers} />
    )
  }

}

const mapStateToProps = (state) => {
  var trainer = state.booking.chosenTrainer.trainer;
  var activities = trainer && state.booking.bookingType === CONSTS.BOOKING_TYPE.BY_TRAINER ? trainer.activities :
    state.auth.appSettings.activities;
  return {
    appSettings: state.auth.appSettings,
    activities: activities,
    bookingState: state.booking,
    planItems: state.plans.planItems
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectActivity: (activity) => {
      dispatch(selectActivity(activity))
    },
    setBookingType: (type) => {
      dispatch(setBookingType(type))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseActivityContainer)
