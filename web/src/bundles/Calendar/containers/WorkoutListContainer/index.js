import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import WorkoutList from '@Calendar/components/WorkoutList'

class WorkoutListContainer extends Component {
  static propTypes = {
    calendarState: PropTypes.object,
    workoutItems: PropTypes.array.isRequired
  };
  render() {
    return (<WorkoutList
              {...this.props}/>)
  }

}

const mapStateToProps = (state) => {
  return {
    calendarState: state.calendar,
    workoutItems: state.workouts.workoutItems,
  }
};

export default connect(mapStateToProps, null)(WorkoutListContainer)
