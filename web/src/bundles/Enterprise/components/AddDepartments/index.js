import React, {Component, PropTypes } from 'react';
import AddDepartmentsForm from './AddDepartmentsForm';
import { addDepartments, addOffices, employeesOnboard, removeDepartment, removeOffice } from '@store/modules/enterprise/actions';
import { connect } from 'react-redux';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';
import { browserHistory } from 'react-router';


class AddDepartments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowingModal: false
        }
    }

    handleSubmit(form) {
        const {employeesOnboard, addDepartments, addOffices, companyID} = this.props;
        addDepartments(companyID, form.departments);
        addOffices(companyID, form.offices);
        employeesOnboard();
        browserHistory.push('/');
    }
    removeDepartment = (id) => {
        const {removeDepartment, companyID} = this.props;
        removeDepartment(companyID, [{id: id}])
    };
    removeOffice = (id) => {
        const {removeOffice, companyID} = this.props;
        removeOffice(companyID, [{id: id}]);
    };
    handleClose = () => {
        this.setState({isShowingModal: false});
    };

    render() {
        const { company, isOnboard } = this.props;
        return(
            <div>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>Success</h1>
                            <p>Departments and Offices were added</p>
                        </ModalDialog>
                    </ModalContainer>
                }
                <AddDepartmentsForm removeOffice={(id) => this.removeOffice(id)} removeDepartment={::this.removeDepartment} company={company} isOnboard={isOnboard} isFetching={this.props.isFetching} onSubmit={::this.handleSubmit} />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        companyID: state.auth.user.companyList[0].id,
        isFetching: state.enterprise.isFetching,
        addOffice: state.enterprise.addOffice,
        addDepartment: state.enterprise.addDepartment,
        isOnboard: state.enterprise.isOnboard
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addDepartments: (companyID, data) => {
            dispatch(addDepartments(companyID, data));
        },
        addOffices: (companyID, data) => {
            dispatch(addOffices(companyID, data));
        },
        employeesOnboard: () => {
            dispatch(employeesOnboard());
        },
        removeDepartment: (companyID, id) => {
            dispatch(removeDepartment(companyID, id))
        },
        removeOffice: (companyID, id) => {
            dispatch(removeOffice(companyID, id))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDepartments);