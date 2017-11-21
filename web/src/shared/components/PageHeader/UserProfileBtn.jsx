import React from 'react';
import { Link } from 'react-router';

const UserProfileBtn = (props) => {
  const { user, menuClickWrapper, menuItems, isMenuOpen, onMenuClick, isCompanyAdmin, code, switchInterface } = props;

  const menu = menuItems.map((item) => {
    // TODO: Detect current page
    const className = '';
    return (
      <li key={item.name} className={className}>
        {typeof item.activate === 'string' ? <Link to={item.activate} activeClassName="active">{item.label}</Link> : <a href="#" onClick={menuClickWrapper(item)}>{item.label}</a>}
      </li>
    );
  });

  const avatarUrl = user.avatar ? user.avatar.url : require('@assets/img/default_profile.png');

  let className = 'btn-group';
  if (isMenuOpen) {
    // TODO: Use cx()
    className += ' open';
  }

    return (
    <div className={className}>
      <a href="#" className="btn btn-primary dropdown-toggle btn-user-profile" onClick={onMenuClick}>
        <span style={{padding: '8px'}}>{user.firstName} {user.lastName[0]}</span>
        <img className="user-avator" src={avatarUrl} alt="Avatar" width="32" />
        <span className="caret" />
      </a>
      <ul className="dropdown-menu dropdown-menu-right profile-menu">
          {isCompanyAdmin && code ?
              <li>
                <a href="#" onClick={() => switchInterface(0)}>Switch to Personal Dashboard</a>
              </li> : isCompanyAdmin && !code ? <li>
                    <a href="#" onClick={() => switchInterface(1)}>Switch to Company Dashboard</a>
              </li> : ''}
        {menu}
      </ul>
    </div>
  );
};

export default UserProfileBtn;
