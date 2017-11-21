import React, { PropTypes } from 'react'
import InviteEmployees from '@Enterprise/components/InviteEmployees';
import { fetchEmployees } from '@store/modules/enterprise/actions';
import { connect } from 'react-redux';

class EmployeesInviteContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {

    }

    render () {
        return(
            <InviteEmployees {...this.props} />
        )
    }
}

const mapStateToProps = (state) => {
    return {
        companyID: state.auth.user.companyList[0].id,
        company: state.auth.user.companyList[0],
        employees: state.enterprise.employees,
        isFetching: state.enterprise.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployees: (companyID) => {
            dispatch(fetchEmployees(companyID));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesInviteContainer);
