import React from 'react';

import MessagesBtn from './MessagesBtn';
import UserProfileBtn from './UserProfileBtn';
import MobileMenu from './MobileMenu';
import MobileMessagesBtn from './MobileMessagesBtn';
import MobileUserProfileBtn from './MobileUserProfileBtn';
import ReferModal from './ReferModal';
import events from '@utils/Events';
import * as Actions from '@shared/actions';
import { Link } from 'react-router';

const PageHeader = (props) => {
  const { user, menuClickWrapper, menuItems, title, isCompanyAdmin, code, switchInterface } = props;
  console.log(isCompanyAdmin, 'ADMIN');
  const menu = menuItems.map((item) => {
    return (
        <Link activeClassName="active" key={item.name} to={item.activate} className="btn btn-link">{item.label}</Link>
    );
  });

  return (
    <header>
      <div className="container">
        <div className="row">
          <div className="col-xs-6">
            <Link to="/">
              <img src={require('@assets/img/fitspot-white.svg')} alt="Fitspot" height="40"/>
            </Link>
            <span className="logo-devider hidden-xs hidden-sm hidden-md" />
            <span className="secondry-logo-text hidden-xs hidden-sm hidden-md">{title || 'Home'}</span>
          </div>

          <div className="col-xs-6 text-right hidden-xs hidden-sm hidden-md">
            {menu}            
            <a className="btn btn-link" href="#" role="button" data-toggle="modal" data-target="#referModal" onClick={() => {events.track("Refer (Header) Clicked");}}>Refer</a>
            <MessagesBtn
              user={user}
              isOpen={props.isMessageOpen}
              onClick={props.onMessageClick}
            />
            <UserProfileBtn
              user={user}
              isCompanyAdmin={isCompanyAdmin}
              code={code}
              switchInterface={(e) => switchInterface(e)}
              menuClickWrapper={menuClickWrapper}
              menuItems={props.userMenuItems}
              isMenuOpen={props.isUserMenuOpen}
              onMenuClick={props.onUserMenuClick}
            />
          </div>

          <div className="col-xs-6 text-right visible-xs visible-sm visible-md">
            <a className="btn btn-link" href="#" role="button" data-toggle="modal" style={{padding: 5}} data-target="#referModal" onClick={() => {events.track("Refer (Header) Clicked")}}>Refer</a>
            <MobileMessagesBtn
              user={user}
              isOpen={props.isMessageOpen}
              onClick={props.onMessageClick}
            />
            <MobileUserProfileBtn
              user={user}
              menuClickWrapper={menuClickWrapper}
              menuItems={props.userMenuItems}
              isMenuOpen={props.isUserMenuOpen}
              onMenuClick={props.onUserMenuClick}
            />
          </div>
        </div>

        <hr className="row-devider visible-xs visible-sm visible-md" />

        <div className="row visible-xs visible-sm visible-md">
          <div className="col-xs-6">
            <span className="secondry-logo-text">Book Now</span>
          </div>
          <div className="col-xs-6">
            <MobileMenu
              menuItems={menuItems}
              menuClickWrapper={menuClickWrapper}
              isMenuOpen={props.isMobileMenuOpen}
              onMenuClick={props.onMobileMenuClick}
            />
          </div>
        </div>
      </div>
      <ReferModal user={props.user} onClick={() => refer(props.user.publicId)} />
    </header>
  );
};

export default PageHeader;
