import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import ChallengeForm from '@Challenges/components/ChallengeForm';
import { updateChallenge, fetchPrizes, addCompanyPrize } from '@store/modules/enterprise/actions';
import moment from 'moment';
import {browserHistory} from 'react-router';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';

class EditChallengeContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activities: [],
            isShowingModal: false,
            error: '',
            status: null
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({status: null});
        if(nextProps.error) {
            this.setState({
                isShowingModal: true,
                error: nextProps.error
            })
        }
        if(nextProps.status) {
            this.setState({
                status: 1
            })
        }
    }
    handleClose = () => {
        this.setState({isShowingModal: false});
        if(this.state.status) {
            browserHistory.push('/challenges/');
        }
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
        const {params, companyID, updateChallenge} = this.props;
        form.challengePrizes = form.challengePrizes.map(prize => ({prizeId: prize.prizeId.value, rank: prize.rank.value}));
        let _prt = [];
        _prt.push(this.props.participiantID);
        form.participantIds = _prt;
        form.activities = this.state.activities;
        form.dtStart = moment.utc( form.dtStart ).format();
        form.dtEnd = moment.utc( form.dtEnd ).format();
        updateChallenge(companyID, params.id, form);
    }
    activitiesAdd = (form) => {
        this.setState({
            activities: form
        })
    };
    render() {
        const {challenges, params} = this.props;
        const challenge = challenges.find(c => (c.id == +params.id));
        challenge.dtStart = moment(challenge.dtStart).format('YYYY/MM/DD'); //Force format for initial values
        challenge.dtEnd = moment(challenge.dtEnd).format('YYYY/MM/DD');
        challenge.challengePrizes = [];
        challenge.prizes.map(pr => {challenge.challengePrizes.push({prizeId: pr.prize.id, rank: pr.rank})});
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
                        <h2 className="text-center">Edit Challenge Information</h2>
                    </div>
                </div>
                <ChallengeForm addPrize={::this.addPrize} initialValues={challenge} {...this.props} activities={(form) => this.activitiesAdd(form)} onSubmit={::this.handleSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        challenges: state.enterprise.data,
        participiantID: state.auth.user.id,
        companyList: state.auth.user.companyList,
        companyID: state.auth.user.companyList[0].id,
        prizes: state.enterprise.prizes,
        isFetching: state.enterprise.isFetching,
        error: state.enterprise.error,
        status: state.enterprise.status
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateChallenge: (companyID, challengeID ,data) => {
            dispatch(updateChallenge(companyID, challengeID, data))
        },
        fetchPrizes: (companyID) => {
            dispatch(fetchPrizes(companyID));
        },
        addCompanyPrize: (companyID, data) => {
            dispatch(addCompanyPrize(companyID, data))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditChallengeContainer);