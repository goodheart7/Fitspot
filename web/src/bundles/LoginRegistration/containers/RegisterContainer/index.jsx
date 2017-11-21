import React, { Component } from 'react';
import Register from '@LoginRegistration/components/Register';
import { connect } from 'react-redux';
import { createUser, createUserFB, loginFail } from '@store/modules/auth/actions';
import * as Actions from '@shared/actions';
import * as Facebook from '@shared/integrations/facebook';
import { loginWorkflow } from '../../workflow';
import * as config from '@config';

class RegisterContainer extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoggedIn) {
      loginWorkflow(nextProps.user);
    }
  }
  componentWillMount() {
    Facebook.init();
  }
  render() {
    return (
      <Register
        {...this.props}
        onSubmit={this.props.onRegisterSubmit}
      />
    );
  }
}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    isLoggedIn: state.auth.loggedIn,
    user: state.auth.user,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    onRegisterSubmit: (user) => {
      dispatch(createUser(user));
    },
    onFacebookLoginClick: (event) => {
      event.preventDefault();
      Facebook.login(
        config.facebookScopes,
        (response) => dispatch(createUserFB({token: response.authResponse.accessToken, timezone: 'US/Eastern'})),
        (response) => dispatch(loginFail(response.message))
      );
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);
