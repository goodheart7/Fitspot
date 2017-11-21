import React from 'react';
import { connect } from 'react-redux';
import onClickOutside from 'react-onclickoutside';
import * as Actions from '@shared/actions';
import {
    BOOKING_CHOOSE_ACTIVITY_URL,
    CALENDAR_ACTIVITIES_URL,
    PROFILE_URL,
    PROFILE_ACCOUNT_SETTINGS_URL,
    PROFILE_SUBSCRIPTION_SETTINGS_URL,
    USER_LOGOUT_URL,
    PROFILE_EDIT
} from '@shared/actions';
import { logout } from '@store/modules/auth/actions';
import { switchInterface } from '@store/modules/enterprise/actions';
import PageHeader from '@shared/components/PageHeader';
import PageUnauthorizedHeader from '@shared/components/PageUnauthorizedHeader';
import CONSTS from '@utils/Consts'
import { browserHistory } from 'react-router';

const MENU_ITEMS = [
  {
    name: 'book-now',
    label: 'Book now',
    activate: BOOKING_CHOOSE_ACTIVITY_URL
  },
  {
    name: 'calendar',
    label: 'Calendar',
    activate: CALENDAR_ACTIVITIES_URL
  }
];

const USER_MENU_ITEMS = [
  {
    name: 'profile-view',
    label: 'View Profile',
    activate: PROFILE_URL
  },
  {
    name: 'edit-profile',
    label: 'Edit Profile',
    activate: PROFILE_EDIT
  },
  {
    name: 'account-settings',
    label: 'Account Settings',
    activate: PROFILE_ACCOUNT_SETTINGS_URL
  },
  {
    name: 'subscriptions-settings',
    label: 'Subscription Settings',
    activate: PROFILE_SUBSCRIPTION_SETTINGS_URL
  },
  {
    name: 'customer-support',
    label: 'Customer Support',
    activate: Actions.customerSupport
  },
  {
    name: 'view-website',
    label: 'View Website',
    activate: Actions.viewWebsite
  },
  {
    name: 'logout',
    label: 'Log Out',
    activate: USER_LOGOUT_URL
  }
];

const ADMIN_MENU_ITEMS = [
  {
    name: 'dashboard',
    label: 'Dashboard',
    activate: '/'
  },
  {
    name: 'challenges',
    label: 'Challenges',
    activate: '/challenges/'
  },
  {
    name: 'employees',
    label: 'Employees',
    activate: '/employees/'
  }
];
const COMPANY_ADMIN_MENU_ITEMS = [
  {
      name: 'departments',
      label: 'Add Departments',
      activate: '/employees/add-departments/'
  },
  {
    name: 'logout',
    label: 'Log Out',
    activate: USER_LOGOUT_URL
  },
];
class PageHeaderContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserMenuOpen: false,
      isMessageOpen: false,
      isMobileMenuOpen: false,
    };

    this.menuClickWrapper = this.menuClickWrapper.bind(this);
    this.onUserMenuClick = this.onUserMenuClick.bind(this);
    this.onMessageClick = this.onMessageClick.bind(this);
    this.onMobileMenuClick = this.onMobileMenuClick.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.closeMenus = this.closeMenus.bind(this);
  }

  menuClickWrapper(item) {
    return (event) => {
      event.preventDefault();
      this.closeMenus();
      if(typeof item.activate === 'string') {
        browserHistory.push(item.activate)
      } else {
        item.activate();
      }
    };
  }
  onUserMenuClick(event) {
    event.preventDefault();

    this.setState({
      isUserMenuOpen: !this.state.isUserMenuOpen
    });
  }

  onMessageClick(event) {
    event.preventDefault();
    Actions.chat();
  }

  onMobileMenuClick(event) {
    event.preventDefault();
    this.setState({
      isMobileMenuOpen: !this.state.isMobileMenuOpen
    });
  }

  closeMenus() {
    this.setState({
      isUserMenuOpen: false,
      isMessageOpen: false,
      isMobileMenuOpen: false,
    });
  }

  handleClickOutside(event) {
    this.closeMenus();
  }

  applyInterface = (code) => {
    this.props.switchInterface(code);
  };

  render() {
    const { isLoggedIn, user, title, isCompanyAdmin, code } = this.props;

    if (!isLoggedIn) {
      return (
        <PageUnauthorizedHeader />
      );
    }

    return (
      <PageHeader
        user={user}
        title={title}
        code={code}
        isCompanyAdmin = {isCompanyAdmin}
        menuClickWrapper={this.menuClickWrapper}
        menuItems={code ? ADMIN_MENU_ITEMS : MENU_ITEMS}
        userMenuItems={code ? COMPANY_ADMIN_MENU_ITEMS : USER_MENU_ITEMS}
        isUserMenuOpen={this.state.isUserMenuOpen}
        onUserMenuClick={this.onUserMenuClick}
        isMessageOpen={this.state.isMessageOpen}
        onMessageClick={this.onMessageClick}
        isMobileMenuOpen={this.state.isMobileMenuOpen}
        onMobileMenuClick={this.onMobileMenuClick}
        switchInterface={(e) => this.applyInterface(e)}
      />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.loggedIn,
    user: state.auth.user,
    isCompanyAdmin: _.find(state.auth.user.companyList[0].participants,
      function(item) {
        return item.userType === CONSTS.COMPANY_USER_TYPE.ADMIN && item.user.id ===state.auth.user.id ;
      }),
    code:  state.enterprise.code

  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchInterface: (code) => {
            dispatch(switchInterface(code));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(onClickOutside(PageHeaderContainer));
