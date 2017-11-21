import React from 'react';
import RegisterForm from './RegisterForm';
import events from '@utils/Events';
import CONSTS from '@utils/Consts';

const Register = (props) => {
  const {onRegisterSubmit, isFetching, error, onFacebookLoginClick} = props;

  // TODO: Nice-looking error component
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-12">
          <div className="login-area register-area text-center">
            <h2>Welcome to Fitspot!</h2>
            <p>Fill in your details below.</p>
            <a href="#" className="btn btn-primary btn-lg btn-block btn-fb" onClick={(event) => {
              onFacebookLoginClick(event);
              events.track("Signed Up", {
                'userType' : CONSTS.USER_TYPE.CUSTOMER,
                'method' : 'Facebook'
              });
            }}>Sign Up using Facebook</a>
            {error ? <div className="alert alert-danger">{error}</div> : null}
            <RegisterForm onSubmit={(user) => {
              onRegisterSubmit(user);
              events.track("Signed Up", {
                'userType' : CONSTS.USER_TYPE.CUSTOMER,
                'method' : 'Manual'
              });
            }} isFetching={isFetching} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
