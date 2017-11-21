import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ChallengeForm from '@Challenges/components/ChallengeForm';
import { createChallenge, fetchPrizes, addCompanyPrize } from '@store/modules/enterprise/actions';
import moment from 'moment';
import {browserHistory} from 'react-router';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class ChallengesCreateContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            isShowingModal: false,
            error: ''
        }
    }
    componentWillReceiveProps (nextProps) {
        if(nextProps.error) {
            this.setState({
                isShowingModal: true,
                error: nextProps.error
            })
        }
        if(nextProps.createSuccess) {
            this.setState({
                createSuccess: true
            })
        }

    }
    handleClose = () => {
        this.setState({isShowingModal: false, error: ''});
    };
    componentDidMount() {
        const {fetchPrizes, companyID} = this.props;
        fetchPrizes(companyID);
    }

    addPrize(form) {
        const {addCompanyPrize, companyID, isFetching, fetchPrizes} = this.props;
        addCompanyPrize(companyID, form);
        if(!isFetching) {
            fetchPrizes(companyID);
        }
    }

    handleSubmit(form){
        form.challengePrizes = form.challengePrizes.map(prize => ({prizeId: prize.prizeId.value, rank: prize.rank.value}));
        let _prt = [];
        _prt.push(this.props.participiantID);
        form.participantIds = _prt;
        form.activities = this.state.activities;
        form.dtStart = moment.utc( form.dtStart ).format();
        form.dtEnd = moment.utc( form.dtEnd ).format();
        this.props.createChallenge(this.props.companyID, form);
        browserHistory.push('/challenges/');
    }
    activitiesAdd = (form) => {
      this.setState({
          activities: form
      })
    };
    render() {
        return (
            <div>
                {
                    this.state.isShowingModal &&
                    <ModalContainer onClose={this.handleClose}>
                        <ModalDialog onClose={this.handleClose}>
                            <h1>Error</h1>
                            <p>{this.state.error}</p>
                        </ModalDialog>
                    </ModalContainer>
                }
                <div className="container">
                    <div className="row">
                        <h2 className="text-center">Challenge Information</h2>
                    </div>
                </div>
                <ChallengeForm addPrize={::this.addPrize} companyList={this.props.companyList} prizes={this.props.prizes} activities={(form) => this.activitiesAdd(form)} onSubmit={::this.handleSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        participiantID: state.auth.user.id,
        companyList: state.auth.user.companyList,
        companyID: state.auth.user.companyList[0].id,
        prizes: state.enterprise.prizes,
        isFetching: state.enterprise.isFetching,
        error: state.enterprise.error,
        createSuccess: state.enterprise.createSuccess
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        createChallenge: (companyID, data) => {
            dispatch(createChallenge(companyID, data));
        },
        fetchPrizes: (companyID) => {
            dispatch(fetchPrizes(companyID));
        },
        addCompanyPrize: (companyID, data) => {
            dispatch(addCompanyPrize(companyID, data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChallengesCreateContainer);