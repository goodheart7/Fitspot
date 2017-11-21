import React, { Component } from 'react';
import LoginRegister from '@LoginRegistration/components/LoginRegister';
import { connect } from 'react-redux';
import { loginUser, createUserFB, loginFail, authResetState } from '@store/modules/auth/actions';
import { switchInterface } from '@store/modules/enterprise/actions';
import * as Actions from '@shared/actions';
import { loginWorkflow } from '../../workflow';
import * as Facebook from '@shared/integrations/facebook';
import * as config from '@config';
import CONSTS from '@utils/Consts';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';
class LoginRegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isShowingModal: false,
        companyName: '',
        userName: ''
    };
    props.resetErrorState();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
        const isCompanyAdmin = nextProps.user.companyList[0].participants.find(i => (
            i.userType === CONSTS.COMPANY_USER_TYPE.ADMIN && i.user.id === nextProps.user.id
        ));
        if(isCompanyAdmin) {
          const {firstName, lastName} = nextProps.user;
          const {name} = nextProps.user.companyList[0];
            this.setState({
                isShowingModal: true,
                companyName: name,
                userName: `${firstName} ${lastName[0]}.`
            })
        }else {
            loginWorkflow(nextProps.user);
        }
    } else
    if (nextProps.needMoreInfo) {
      Actions.userMoreInfo();
    }
  }
  componentWillMount() {
    Facebook.init();
  }
  onRegisterClick(event) {
    event.preventDefault();

    Actions.userRegister();
  }
  onForgotPasswordClick(event) {
    event.preventDefault();

    Actions.userForgotPassword();
  }
  onChooseInterface = (code) => {
    const {switchInterface, isOnboard} = this.props;
    switch(code) {
        case 0 :
          Actions.home();
          switchInterface(code);
          break;
        case 1 :
          if(isOnboard) {
              Actions.home();
          }else {
              browserHistory.push('/employees/add-employee/')
          }
          switchInterface(code);
          break;
        default:
          switchInterface(code);
          Actions.home();
      }
  };
  render() {
    const {error, onLoginSubmit, onFacebookLoginClick, isFetching, isLoggedIn} = this.props;
    const modalStyle = {
        maxWidth: 420,
        textAlign: 'center',
        padding: 35
    };
    const {isShowingModal, userName, companyName} = this.state;
    return (
      <div>
          {
              isShowingModal &&
              <ModalContainer>
                <ModalDialog onClose={null} style={modalStyle} className="react-modal">
                  <h3>Choose Dashboard</h3>
                  <p className="marginBottom50">
                    Your are managing the <b>{companyName}</b> corporate dashboard and also have a personal account.
                    Which one do you want to log into?
                  </p>
                  <button style={{fontWeight: 600}} onClick={() => this.onChooseInterface(Actions.COMPANY_ADMIN_INTERFACE)} className="btn btn-block btn-default marginBottom20">{companyName} Company Interface</button>
                  <button style={{fontWeight: 600}} onClick={() => this.onChooseInterface(Actions.PERSONAL_INTERFACE)} className="btn btn-block btn-default">{userName} Personal Interface</button>
                </ModalDialog>
              </ModalContainer>
          }
        <LoginRegister
            error={error}
            isFetching={isFetching}
            onLoginSubmit={onLoginSubmit}
            onFacebookLoginClick={onFacebookLoginClick}
            onRegisterClick={this.onRegisterClick}
            onForgotPasswordClick={this.onForgotPasswordClick}
        />
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isLoggedIn: state.auth.loggedIn,
    needMoreInfo: state.auth.needMoreInfo,
    user: state.auth.user,
    isOnboard: state.enterprise.isOnboard
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    resetErrorState: () => {
      dispatch(authResetState());
    },
    onLoginSubmit: (form) => {
      dispatch(loginUser(form.email, form.password));
    },
      switchInterface: (code) => {
          dispatch(switchInterface(code));
      },
    onFacebookLoginClick: (event) => {
      event.preventDefault();
      Facebook.login(
        config.facebookScopes,
        (response) => dispatch(createUserFB({token: response.authResponse.accessToken, timezone: 'US/Eastern'})),
        (response) => dispatch(loginFail(response.message))
      );
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginRegisterContainer);
