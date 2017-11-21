import React, { PropTypes } from 'react'
import Subscription from '@Subscription/components/Subscription'
import { connect } from 'react-redux';
import ApiUtils from '@utils/ApiUtils';
import { subscribePlan, selectPlan } from '@store/modules/subscription/actions';
import { fetchWorkoutsAvailable } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';
import events from '@utils/Events';

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    subscribePlan: Function,
    planItem: Object,
};
class SubscriptionContainer extends React.Component {
    state = {
        isShowingModal: false,
    }
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      status: null,
      message: ''
    };
    this.onClickNextPlan = this.onClickNextPlan.bind(this)
    this.onClickPrevPlan = this.onClickPrevPlan.bind(this)
    this.onClickPurchase = this.onClickPurchase.bind(this)
  }
  handleClose = () => {
    this.setState({isShowingModal: false, message: '', status: null});
    if(this.state.shouldRedirect){
      browserHistory.push('/');
    }
  };
  componentWillMount() {
    if(!this.props.selectedPlan) {
      this.props.selectPlan(this.props.plans[0])
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.error.length > 0){
      this.setState({
        message: nextProps.error,
        isShowingModal: true,
        status: 1
      })
    } else if(nextProps.planItem.planId) {
      this.setState({
        message: "Congratulations - you are now subscribed! Let's book a workout!",
        isShowingModal: true,
        shouldRedirect: true
      });
    }
  }
  onClickPurchase() {
      this.refs.sub.refs.braintree.tokenize().then((data) => {
        console.log('BT Data: ', data);
        events.track('Subscription Purchased', {
          'subscription' : this.props.selectedPlan.name
        });
        this.props.subscribePlan(this.props.selectedPlan.id, this.props.selectedPlan.isEnterprise, data.nonce)
      }).catch((err) => {
        console.log('y', err);
      });

  }
    handleClose = () => {
        Actions.home();
        this.setState({isShowingModal: false});
    };
  onClickNextPlan() {
    var plans = this.props.plans;
    var planIndex = plans.indexOf(this.props.selectedPlan);
    if(planIndex < plans.length -1) {
      this.props.selectPlan(plans[planIndex + 1]);
    } else {
      this.props.selectPlan(plans[0]);
    }
  }
  onClickPrevPlan() {
    var plans = this.props.plans;
    var planIndex = plans.indexOf(this.props.selectedPlan);
    if(planIndex > 0) {
      this.props.selectPlan(plans[planIndex - 1]);
    } else {
      this.props.selectPlan(plans[plans.length - 1]);
    }
  }
  render () {
    return (
      <div>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>{this.state.status ? 'Error' : 'Success'}</h1>
              <p>{this.state.message}</p>
            </ModalDialog>
          </ModalContainer>
        }
        <Subscription {...this.props} ref="sub"
              plan={this.props.selectedPlan}
              onClickPrevPlan={this.onClickPrevPlan}
              onClickNextPlan={this.onClickNextPlan}
              onClickPurchase={this.onClickPurchase}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userType: state.auth.user.userType,
    appSettings: state.auth.appSettings,
    workouts: state.workouts,
    plans : state.plans.planItems,
    error : state.subscription.error,
    planItem: state.subscription.planItem,
    selectedPlanId: state.subscription.selectedPlanId,
    selectedPlan: state.subscription.selectedPlanItem,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlans: () => {
        dispatch(fetchPlans());
    },
    selectPlan: (planId) => {
        events.track("Subscription Opened", {
            'subscription' : planId.name
        });
        dispatch(selectPlan(planId));
    },
    updateSubscription: () => {
          dispatch(fetchWorkoutsAvailable());
    },
    subscribePlan: (planId, isEnterprise, nonce) => {
        dispatch(subscribePlan(planId, isEnterprise, nonce));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionContainer);
