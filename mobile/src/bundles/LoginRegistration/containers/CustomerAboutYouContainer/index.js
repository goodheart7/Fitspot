import React, { Component } from 'react'
import CustomerAboutYou from '@LoginRegistration/components/CustomerAboutYou'
import { connect } from 'react-redux'
import { updateCustomer } from '@store/modules/auth/actions'
import update from 'immutability-helper';
import CONSTS from '@utils/Consts'
import moment from 'moment';
import {Actions} from 'react-native-router-flux'

type Props = {
  onNextStepPress: Function
}


class CustomerAboutYouContainer extends Component {

  props: Props

  componentWillReceiveProps(nextProps) {
      if (nextProps.user.customer && nextProps.user.customer.customerProfileReady) {
        Actions.home()
      }
    }
  onNextStepPress(form) {
    form.height = Math.round(((12 * parseInt(form.feet)) + parseInt(form.inches)) * 2.54);
    form.weight = +form.weight;
    let user = update(this.props.user, {
      userType: {$set: CONSTS.USER_TYPE.CUSTOMER},
    });

    const apiForm = update(form, {
      birthday: {$set: moment(new Date(form.birthday)).format('YYYY-MM-DD')}
    });

    user = update(user, {
      customer: {$set: apiForm},
    })

    console.log(user);
    this.props.updateCustomer(user)

  }
  render() {
    return (
      <CustomerAboutYou onNextStepPress={this.onNextStepPress.bind(this)} {...this.props}  />
    )
  }

}


const mapStateToProps = (state) => {
  return {
    error: state.auth.error,
    isFetching: state.auth.isFetching,
    user: state.auth.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCustomer: (user) => {
      dispatch(updateCustomer(user))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerAboutYouContainer)
