import React, {Component} from 'react'
import {connect} from 'react-redux'
import AccountSettings from '@Profile/components/AccountSettings'
import {ACCOUNT_SETTINGS_FORM} from '@Profile/components/AccountSettings/AccountSettingsForm';
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import update from 'immutability-helper';
import CONSTS from '@utils/Consts';
import { resetPassword } from '@store/modules/auth/actions'
import {reset} from 'redux-form';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

type Props = {
  resetPassword: Function,
  resetForm: Function,
}

class AccountSettingsContainer extends Component {
  props: Props
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      status: null,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        message: `Save failed: ${nextProps.error}`,
        isShowingModal: true,
        status: 1
      })
    } else if (!nextProps.isFetching && !nextProps.error) {
      this.setState({
        message: "Password Changed!",
        isShowingModal: true,
        status: 1
      });
      this.props.resetForm();
    }
  }

  handleSubmit(form) {
    this.props.resetPassword(form.oldPassword, form.newPassword);
  }
  handleClose = () => {
    this.setState({isShowingModal: false, message: '', status: null});
  };
  render() {
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
          <AccountSettings
              handleSubmit = {this.handleSubmit}
              {...this.props}/>
        </div>

    )
  }

}

const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    appSettings: state.auth.appSettings,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (oldPassword, newPassword) => {
      dispatch(resetPassword(oldPassword, newPassword))
    },
    resetForm: () => {
      dispatch(reset(ACCOUNT_SETTINGS_FORM));
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountSettingsContainer)
