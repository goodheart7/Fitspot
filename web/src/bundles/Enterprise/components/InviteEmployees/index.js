import React, {Component, PropTypes } from 'react';
import AddEmployeeEmails from './AddEmployeeEmails';
import { addEmployee, employeesOnboard } from '@store/modules/enterprise/actions';
import { connect } from 'react-redux';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';


class InviteEmployees extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false
        }
    }

    handleSubmit(form) {
        form.employeeEmails.forEach(q => {
           q.firstName = 'John';
           q.lastName = 'Smith';
        });
        this.props.addEmployees(this.props.companyID, form.employeeEmails);
        if(!this.props.isOnboard) {
            browserHistory.push('/employees/add-departments/');
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.addEmployee) {
            this.setState({isShowingModal: true})
        }
    }
    handleClose = () => {
        this.setState({isShowingModal: false});
        browserHistory.push('/');
    };
    render() {
        const {isOnboard} = this.props;
        return(
            <div>
                {
                    isOnboard && this.state.isShowingModal ?
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>Success</h1>
                            <p>Invitation sent</p>
                        </ModalDialog>
                    </ModalContainer> : ''
                }
                <AddEmployeeEmails isOnboard={isOnboard} isFetching={this.props.isFetching} onSubmit={::this.handleSubmit} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        companyID: state.auth.user.companyList[0].id,
        isFetching: state.enterprise.isFetching,
        addEmployee: state.enterprise.addEmployee,
        isOnboard: state.enterprise.isOnboard,
        error: state.enterprise.error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addEmployees: (companyID, data) => {
            dispatch(addEmployee(companyID, data));
        },
        employeesOnboard: () => {
            dispatch(employeesOnboard());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(InviteEmployees);