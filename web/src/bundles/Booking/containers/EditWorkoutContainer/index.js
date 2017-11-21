import React, {Component} from 'react'
import {connect} from 'react-redux'
import EditWorkout from '@Booking/components/EditWorkout'
import * as Actions from '@shared/actions';
import { cancelSubscription } from '@store/modules/auth/actions'
import { trainerConfirmWorkoutRequest,requestWorkoutChange, cancelWorkout } from '@store/modules/workouts/actions'
import CONSTS from '@utils/Consts'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    cancelWorkout: Function,
    requestWorkoutChange: Function,
}

class EditWorkoutContainer extends Component {
    props : Props;
    constructor(props) {
      super(props);
        this.state = {
            error: '',
            isShowingModal: false,
            status: null
        };
        this.onCancelWorkout = this.onCancelWorkout.bind(this);
      this.onRequestWorkoutChange = this.onRequestWorkoutChange.bind(this);
    }
    onRequestWorkoutChange(workoutId, date) {
      this.props.requestWorkoutChange(workoutId, date);
    }

    onCancelWorkout(workoutId) {
        if(confirm('Are you sure you want to cancel this workout?')) {
          this.props.cancelWorkout(workoutId);
          Actions.home();
        }

    }

    componentWillMount() {
        //this.props.getPlans();
    }
    componentWillReceiveProps(nextProps) {
      if(nextProps.error && nextProps.error.length > 0){
            this.setState({
                error: nextProps.error,
                isShowingModal: true
            });
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.DELETED) {
            this.setState({
                error: "Appointment Cancelled - We have notified the trainer of your cancellation",
                isShowingModal: true
            });
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.FAILED) {
            this.setState({
                error: "Cancellation Failed -  Please contact support for further assistance",
                isShowingModal: true
            });
      } if(nextProps.workouts.confirmingStatus === CONSTS.API_CALL_STATUS.UPDATED) {
            this.setState({
                error: "Appointment Updated - We have sent the trainer a request of your change",
                isShowingModal: true,
                status: 1
            });
      }
    }
    handleClose = () => {
        this.setState({isShowingModal: false});
        if(this.state.status){
            browserHistory.push('/');
        }
    };
    render() {
        return (
            <div>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>Notification</h1>
                            <p>{this.state.error}</p>
                        </ModalDialog>
                    </ModalContainer>
                }
                <EditWorkout
                    onCancelPlan = {this.onCancelPlan}
                    onCancelWorkout = {this.onCancelWorkout}
                    onRequestWorkoutChange = {this.onRequestWorkoutChange}
                    {...this.props}
                />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      bookingState : state.booking,
      plans : state.plans.planItems,
      error : state.auth.error,
      workouts: state.workouts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
      requestWorkoutChange: (workoutId,date) => {
        dispatch(requestWorkoutChange(workoutId,date))
      },
      cancelWorkout: (workoutId) => {
        dispatch(cancelWorkout(workoutId))
      }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditWorkoutContainer)
