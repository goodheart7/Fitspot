import React, {Component, PropTypes} from 'react';
import ProgressBar from '@Challenges/components/ProgressBar';
import {Link} from 'react-router';
import moment from 'moment';

export default class ChallengeCard extends Component{
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
        const {dtStart, dtEnd} = this.props.challenge;
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
        const {progress} = this.state;
        return(
            <Link key={this.props.challenge.name} className="col-xs-12 col-sm-6 col-md-4 challenge-card" to={`/challenges/challenge-detail/${this.props.challenge.id}`}>
                <div className="current-challenge text-center">
                    <h3>{this.props.challenge.name}</h3>
                    <p>{this.props.challenge.description}</p>
                    <div className="challenge-meta">
                        {moment(this.props.challenge.dtStart).isBefore(moment()) ?
                            <ProgressBar start={moment(this.props.challenge.dtStart).format('MMM D')} end={moment(this.props.challenge.dtEnd).format('MMM D')} progress={progress} /> :
                            <div className="challenge-start-date">Starting on {moment(this.props.challenge.dtStart).format('MMM D')}</div>
                        }
                    </div>
                    <p className="challenge-enrolled">{this.props.challenge.participants.length} Enrolled</p>
                </div>
            </Link>
        )
    }
};