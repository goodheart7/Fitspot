import React, { PropTypes } from 'react'
import ChooseSubscription from '@Booking/components/ChooseSubscription'
import { connect } from 'react-redux';
import ApiUtils from '@utils/ApiUtils';
import { subscribePlan, selectPlan } from '@store/modules/subscription/actions';
import { fetchWorkoutsAvailable } from '@store/modules/auth/actions';
import { addSubscriptionOption } from '@store/modules/booking/actions';
import * as Actions from '@shared/actions';
import { browserHistory } from 'react-router';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { find } from 'lodash';

type Props = {
    bookingState : Object,
    plans : Array,
    getPlans : Function,
    subscribePlan: Function,
    updateSubscription: Function,
    planItem: Object,
};
class ChooseSubscriptionContainer extends React.Component {
    constructor(props) {
        super(props);
        this.onClickPurchase = this.onClickPurchase.bind(this)
    }
    state = {
        isShowingModal: false,
    }
    componentDidMount(){
      let id = this.props.location.query.id;
      if(id){
        let plan = find(this.props.plans, function(o) { return o.id == id; });
        this.props.selectPlan(plan)
      }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.error.length > 0){
            //TODO: Better - use modal for error
            alert(nextProps.error);
        } else if(nextProps.planItem.planId) {
            this.props.updateSubscription();
            this.props.refreshSubcription(this.props.selectedPlan);
            this.setState({isShowingModal: true});
        }
    }
    handleClose = () => {
        browserHistory.push('/booking/add-friends/');
        this.setState({isShowingModal: false});
    };
    onClickPurchase() {
        this.refs.sub.refs.braintree.tokenize().then((data) => {
            console.log('BT Data: ', data);
            this.props.subscribePlan(this.props.selectedPlan.id, this.props.selectedPlan.isEnterprise, data.nonce)
        }).catch((err) => {
            console.log('y', err);
        });

    }
    clickBack = () => {
        browserHistory.push('/booking/choose-plan/');
    };
    render () {
        return (
            <div>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h3>{this.props.selectedPlan.name}</h3>
                            <p>Congratulations - you are now subscribed! Let's book a workout!</p>
                        </ModalDialog>
                    </ModalContainer>
                }
                <ChooseSubscription {...this.props} ref="sub"
                              plan={this.props.selectedPlan}
                              onClickBack={() => this.clickBack()}
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
        selectedPlan: state.subscription.selectedPlanItem,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPlans: () => {
            dispatch(fetchPlans());
        },
        selectPlan: (planId) => {
            dispatch(selectPlan(planId));
        },
        updateSubscription: () => {
          dispatch(fetchWorkoutsAvailable());
        },
        refreshSubcription: (option) => {
          dispatch(addSubscriptionOption(option));
        },
        subscribePlan: (planId, isEnterprise, nonce) => {
            dispatch(subscribePlan(planId, isEnterprise, nonce));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseSubscriptionContainer);
