import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import EmptyChallengesList from '@Challenges/components/EmptyChallengesList';
import CurrentChallenges from '@Challenges/components/CurrentChallenges';
import CompletedChallenges from '@Challenges/components/CompletedChallenges';
import { fetchChallenges } from '@store/modules/enterprise/actions';

class ChallengesContainer extends Component {
    static propTypes = {
      challenges: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getChallenges(this.props.companyID);
    }

    render() {
        const {challenges, isFetching} = this.props;
        return (
            <div>
                {challenges.length ? <div>
                        <CurrentChallenges challenges={challenges}/>
                        <CompletedChallenges challenges={challenges}/>
                    </div> : !isFetching && !challenges.length ? <EmptyChallengesList/> : ''}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        companyID: state.auth.user.companyList[0].id,
        challenges: state.enterprise.data,
        isFetching: state.enterprise.isFetching
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChallenges: (id) => {
            dispatch(fetchChallenges(id));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ChallengesContainer);
