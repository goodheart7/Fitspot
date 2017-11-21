import React, { Component } from 'react';
import { connect } from 'react-redux';
import Logout from '@LoginRegistration/components/Logout';
import { logout } from '@store/modules/auth/actions';
import { browserHistory } from 'react-router';

class LogoutContainer extends Component {
  constructor(props) {
    super(props);
      const { logout } = this.props;
      logout();
  }
  componentWillReceiveProps(nextProps) {
    if(!nextProps.loggedIn) {
        browserHistory.push('/user/login/');
    }
  }
    render() {

    return (
      <Logout />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(LogoutContainer);
