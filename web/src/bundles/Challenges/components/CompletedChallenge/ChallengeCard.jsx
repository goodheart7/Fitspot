import React, {Component} from 'react';
import ProgressBar from '@Challenges/components/ProgressBar';
import moment from 'moment';

export default class CompletedChallengeCard extends Component {

    interval;
    constructor(props) {
        super(props);
        this.state = {
            progress: 0
        }
    }
    componentDidMount() {
        this.progress();
        this.interval = setInterval(() => this.progress(), 5000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    progress = () => {
        const { challenges, params } = this.props;
        const challenge = challenges.find(item => {
            return item.id === +params.id;
        });
        const {dtStart, dtEnd} = challenge;
        if(moment(dtEnd).isBefore(moment())){
            this.setState({progress: 100}); //if challenge ended set 100
        }
        else if(moment(dtStart).isBefore(moment())) {
            let diff = moment.duration(moment(dtEnd).diff(moment(dtStart)));
            let now = moment.duration(moment().diff(moment(dtStart)));
            this.setState({progress: Math.abs(now / diff) * 100});
        }
        else {
            this.setState({progress: 0}); //set progress to 0 if challenge not started
        }
    };

    render() {
        const { challenges, params } = this.props;
        const challenge = challenges.find(item => {
           return item.id === +params.id;
        });
        const { progress } = this.state;
        return(
            <div className="col-xs-12 col-sm-4 col-sm-offset-4 marginBottom50">
                <div className="text-center">
                    <h2>{challenge.name}</h2>
                    <p>{challenge.description}</p>
                    <div className="challenge-meta">
                        {
                            moment(challenge.dtStart).isBefore(moment()) ?
                                <ProgressBar start={moment(challenge.dtStart).format('MMM D')} end={moment(challenge.dtEnd).format('MMM D')} progress={progress} /> :
                                <div className="challenge-start-date">Starting on {moment(challenge.dtStart).format('MMM D')}</div>
                        }


                    </div>
                    <p className="challenge-enrolled">{challenge.participants.length} Enrolled</p>
                </div>
            </div>
        )
    }
};
