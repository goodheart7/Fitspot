import React, {Component} from 'react'
import {connect} from 'react-redux'
import ChoosePlan from '@Booking/components/ChoosePlan'
import * as Actions from '@shared/actions';
import { fetchPlans } from '@store/modules/plans/actions';
import { addSubscriptionOption, activateSinglePurchaseBooking, increaseCurrentStep, setCurrentStep, CHOOSE_PLAN_STEP } from '@store/modules/booking/actions'
import events from '@utils/Events'

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    addSubscriptionOption: Function,
    activateSinglePurchaseBooking: Function,
}

class ChoosePlanContainer extends Component {
    props : Props
    constructor(props) {
      super(props);
      this.onChoosePlan = this.onChoosePlan.bind(this);
      this.onChooseSingleWorkout = this.onChooseSingleWorkout.bind(this);
    }
    onChoosePlan(plan) {
        this.props.addSubscriptionOption(plan);
        events.bookingChosePlan(this.props.bookingState.bookingType, plan.name);
        Actions.addFriends();
    }
    onChooseSingleWorkout(plan) {
        this.props.activateSinglePurchaseBooking();
        events.bookingChosePlan(this.props.bookingState.bookingType, "Single Session");
        Actions.addFriends();
    }

    componentWillUnmount(){
        this.props.increaseCurrentStep();
    }
    componentWillMount() {
        this.props.setCurrentStep(CHOOSE_PLAN_STEP);
        this.props.getPlans();
    }

    render() {
        return (
            <ChoosePlan
                showSingleWorkout
                title = 'Workout Type'
                onChoosePlan = {this.onChoosePlan}
                onChooseSingleWorkout = {this.onChooseSingleWorkout}
                {...this.props}
            />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        bookingState : state.booking,
        plans : state.plans.planItems,
        workoutInfo: state.auth.user.workoutInfo,
        appSettings: state.auth.appSettings,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPlans: () => {
            dispatch(fetchPlans());
        },
        activateSinglePurchaseBooking: () => {
           dispatch(activateSinglePurchaseBooking())
        },
        addSubscriptionOption: (plan) => {
           dispatch(addSubscriptionOption(plan))
        },
        increaseCurrentStep: () => {
            dispatch(increaseCurrentStep())
        },
        setCurrentStep: (step) => {
            dispatch(setCurrentStep(step))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePlanContainer)
