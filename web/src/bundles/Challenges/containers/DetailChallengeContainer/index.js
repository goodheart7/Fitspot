import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import CompletedChallenge from '@Challenges/components/CompletedChallenge'
import { acceptChallenge, challengeProgress, challengeLeaderboard } from '@store/modules/enterprise/actions';

class DetailChallengeContainer extends Component {
    static propTypes = {
        challenges: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            winners: [
                {
                    name: 'John Smith',
                    place: 1,
                    avatar: 'http://www.canal4.com.ni/images/2015/mayo/04/notabra.jpg'
                },
                {
                    name: 'John Smith',
                    place: 2,
                    avatar: 'http://www.canal4.com.ni/images/2015/mayo/04/notabra.jpg'
                },
                {
                    name: 'John Smith',
                    place: 3,
                    avatar: 'http://www.canal4.com.ni/images/2015/mayo/04/notabra.jpg'
                }
            ]
        }
    }

    componentWillMount() {
        const {challengeLeaderboard, params } = this.props;
        challengeLeaderboard(params.id);
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        const {leaders, challenges, params} = this.props;
        return (
            <div>
                {
                    /*

                     <button className="btn btn-info" onClick={() => {this.props.challengeProgress(this.props.params.id)}}>Challenge Progress [ TEST ]</button>
                     <button className="btn btn-info" onClick={() => {this.props.acceptChallenge(this.props.params.id, {isRSVP: true})}}>Accept challenge [ TEST ]</button>

                    */
                }
                <CompletedChallenge challenge={challenges} leaders={leaders} params={params} winner={this.state.winners}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        challenges: state.enterprise.data,
        progress: state.enterprise.progress,
        leaders: state.enterprise.leaders,
        error: state.enterprise.error
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        acceptChallenge: (challengeID , data) => {
            dispatch(acceptChallenge(challengeID, data))
        },
        challengeProgress: (challengeID, data) => {
            dispatch(challengeProgress(challengeID))
        },
        challengeLeaderboard: (challengeID) => {
            dispatch(challengeLeaderboard(challengeID))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(DetailChallengeContainer);