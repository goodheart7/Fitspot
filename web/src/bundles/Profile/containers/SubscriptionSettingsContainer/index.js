import React, {Component} from 'react'
import {connect} from 'react-redux'
import SubscriptionSettings from '@Profile/components/SubscriptionSettings'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { cancelSubscription } from '@store/modules/auth/actions'
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';

type Props = {
  bookingState: Object,
  cancelSubscription: Function
};

class SubscriptionSettingsContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      message: '',
      confirm: null
    };
    this.onCancelPlan = this.onCancelPlan.bind(this);
  }
  handleClose = () => {
    this.setState({isShowingModal: false, message: '', confirm: null});
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        message: nextProps.error,
        isShowingModal: true
      });
    } else if (!nextProps.isFetching && !nextProps.error) {
      browserHistory.push('/')
    }
  }


  confrimCancel = () => {
      this.props.cancelSubscription();
      this.handleClose();
  }

  onCancelPlan(plan) {
    this.setState({
      isShowingModal: true,
      confirm: true,
      message: 'Are you sure?'
    });
  }

  render() {
    return (
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>{this.state.confirm ? 'Confirmation' : 'Error'}</h1>
                <p>{this.state.message}</p>
                {this.state.confirm ? <div>
                  <button onClick={() => this.confrimCancel()} className="btn btn-block btn-info">Accept</button>
                  <button onClick={this.handleClose} className="btn btn-block btn-default">Decline</button>
                </div> : ''}
              </ModalDialog>
            </ModalContainer>
          }
          <SubscriptionSettings
              onCancelPlan = {this.onCancelPlan}
              {...this.props}/>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    isFetching: state.auth.isFetching
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    cancelSubscription: () => {
        dispatch(cancelSubscription());
    }
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionSettingsContainer)
