import React, {Component} from 'react'
import {connect} from 'react-redux'
import update from 'immutability-helper';
import EditProfile from '@Profile/components/EditProfile'
import * as Actions from '@shared/actions';
import ApiUtils from '@utils/ApiUtils';
import { updateCustomer } from '@store/modules/auth/actions'
import CONSTS from '@utils/Consts';
import { toRestDate } from '@shared/helpers';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';

type Props = {
  updateCustomer: Function,
}

class EditProfileContainer extends Component {
  props: Props;
  constructor(props) {
    super(props);
    this.state = {
      isShowingModal: false,
      message: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleClose = () => {
    this.setState({isShowingModal: false, message: ''});
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({
        message: nextProps.error,
        isShowingModal: true
      });
    } else if (!nextProps.isFetching && !nextProps.error) {
      browserHistory.push('/');
    }
  }
  handleSubmit(form) {
    form.customer.height = Math.floor((12 * (form.customer.feet.hasOwnProperty('label') ? form.customer.feet.value : form.customer.feet) + (form.customer.inches.hasOwnProperty('label') ? form.customer.inches.value : form.customer.inches)) * 2.54);
    let user = update(this.props.user, {
      userType: {$set: CONSTS.USER_TYPE.CUSTOMER},
    });

    const apiForm = update(form, {
      birthday: {$set: toRestDate(form.customer.birthday)}
    });

    if (user.customer) {
      user = update(user, {
        customer: {$merge: apiForm.customer},
      })
    } else {
      user = update(user, {
        customer: {$set: apiForm},
      });
    }
    // user = update(user, {
    //   customer : {
    //     preferredTrainerGender: {$set: 0},
    //   }
    // });
    this.props.updateCustomer(user);
  }

  render() {
    return (
        <div>
          {
            this.state.isShowingModal &&
            <ModalContainer onClose={this.handleClose}>
              <ModalDialog onClose={this.handleClose}>
                <h1>Error</h1>
                <p>{this.state.message}</p>
              </ModalDialog>
            </ModalContainer>
          }
          <EditProfile
              handleSubmit = {this.handleSubmit}
              {...this.props}/>
        </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
    isFetching: state.auth.isFetching,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCustomer: (user) => {
      dispatch(updateCustomer(user))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileContainer)
