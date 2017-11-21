import React from 'react';
import {userLogin, userRegister} from '@shared/actions';
import { Link } from 'react-router';

const PageUnauthorizedHeader = (props) => {

  return (
    <header>
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <Link to="/">
              <img src={require('@assets/img/fitspot-white.svg')} alt="Fitspot" height="40" />
            </Link>
          </div>
          <div className="col-xs-6 text-right">
            <Link activeClassName="active" className="btn btn-link" to="/user/register/" role="button">SIGN UP</Link>
            <Link activeClassName="active" className="btn btn-link" to='/user/login/' role="button">LOG IN</Link>

          </div>
        </div>
      </div>
    </header>
  );
};

export default PageUnauthorizedHeader;
