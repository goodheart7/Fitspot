import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import Calendar from '@Calendar/components/Calendar'

class CalendarContainer extends Component {
    static propTypes = {
        calendarState: PropTypes.object,
        workoutItems: PropTypes.array.isRequired,
    };
  render() {
    return (<Calendar
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    calendarState: state.calendar,
    workoutItems: state.workouts.workoutItems,
  }
};
export default connect(mapStateToProps, null)(CalendarContainer)
