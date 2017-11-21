import React, { Component } from 'react'
import { connect } from 'react-redux'
import ChooseDateTime from '@Booking/components/ChooseDateTime'
import * as Actions from '@shared/actions';
import { selectDateTime, increaseCurrentStep, setCurrentStep, CHOOSE_DATE_TIME_STEP } from '@store/modules/booking/actions'
import moment from 'moment'
import CONSTS from '@utils/Consts'
import events from '@utils/Events'


type Props = {
  bookingState: Object,
  selectDateTime: Function,
  increaseCurrentStep: Function,
  decreaseCurrentStep: Function
}

class ChooseDateTimeContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.onContinueClick = this.onContinueClick.bind(this);
  }

  componentDidMount(){
    this.props.setCurrentStep(CHOOSE_DATE_TIME_STEP);
  }

  componentWillUnmount(){
    this.props.increaseCurrentStep();
  }

  onContinueClick(form) {
    let newTime = moment(form.day +' '+ (moment(form.time).isValid() ? moment(form.time).format('h:mm a') : form.time),'MM-DD-YYYY h:mm a'); //using moment lib for format our date timestamp
    this.props.selectDateTime(newTime);
    events.bookingChoseDT(this.props.bookingState.bookingType, newTime, "");
    Actions.chooseLocation();
}
  render() {
    const {error, isFetching} = this.props;
    return (
      <ChooseDateTime {...this.props} onContinueClick={this.onContinueClick} />
    )
  }

}

const mapStateToProps = (state) => {
  return {
    bookingState: state.booking
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectDateTime: (dateTime) => {
      dispatch(selectDateTime(dateTime))
    },
    increaseCurrentStep: () => {
      dispatch(increaseCurrentStep())
    },
    setCurrentStep: (step) => {
      dispatch(setCurrentStep(step))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChooseDateTimeContainer)
