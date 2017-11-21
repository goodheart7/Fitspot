import React, {Component, PropTypes} from 'react';
import ChallengeGlobalActivities from './LeaderboardComponents/ChallengeGlobalActivities';
import ChallengeRanking from './LeaderboardComponents/ChallengeRanking';
import { Link } from 'react-router';

const Leaderboard = (props) => {
    const manSVG = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"><path d="M119 92c-3.8-3.8-10.1-7.1-20.1-12.1 -5-2.5-13.4-6.7-15.4-8.6 8.5-10.4 13.4-22.2 13.4-32.5 0-7 0-15.7-3.9-23.5C89.4 8.3 81.5 0 64 0 46.5 0 38.6 8.3 35 15.3c-3.9 7.8-3.9 16.5-3.9 23.5 0 10.3 4.9 22.1 13.4 32.5 -2 1.9-10.4 6.1-15.4 8.6 -10 5-16.3 8.3-20.1 12.1 -8.4 8.4-9 22.4-9 25.2 0 2.9 1.1 5.6 3.1 7.6 2 2 4.7 3.2 7.6 3.2h106.7c2.9 0 5.6-1.1 7.6-3.2 2-2 3.1-4.8 3.1-7.7C128 114.4 127.3 100.4 119 92zM119.2 119.2c-0.5 0.5-1.2 0.8-1.9 0.8H10.7c-0.7 0-1.4-0.3-1.9-0.8 -0.5-0.5-0.8-1.2-0.8-1.9 0-1.3 0.4-13.3 6.7-19.6 2.9-2.9 9-6.1 18-10.6 9.6-4.8 14.9-7.6 17.3-9.9l5.4-5.1 -4.7-5.8c-7.4-9.1-11.6-19.1-11.6-27.5 0-6.5 0-13.8 3.1-19.9C45.8 11.7 53.2 8 64 8c10.8 0 18.2 3.7 21.8 10.9 3.1 6.1 3.1 13.4 3.1 19.9 0 8.4-4.2 18.4-11.6 27.5l-4.7 5.8 5.4 5.1c2.4 2.3 7.8 5.2 17.3 9.9 9 4.5 15.1 7.6 18 10.6 5.1 5.1 6.6 14.8 6.7 19.6C120 118 119.7 118.7 119.2 119.2z"/></svg>;
    return (
        <div className="col-xs-12">
            <ul className="completed-challenge-meta">
                <li>
                    <span>3285</span>
                    <small className="text-uppercase">Global points</small>
                </li>
                <li>
                    <span>2/day</span>
                    <small className="text-uppercase">avg. activities</small>
                </li>
                <li>
                    <span>200/{manSVG}</span>
                    <small className="text-uppercase">avg. points</small>
                </li>
            </ul>
            <div className="marginBottom50">
                <h3 className="text-center marginBottom20">Global Activity</h3>
                <ChallengeGlobalActivities />
            </div>
            <ChallengeRanking {...props} />
            <div className="text-center col-xs-12 col-sm-6 col-sm-offset-3" style={{marginTop: 35}}>
                <Link to="#" className="btn btn-info btn-block">View Survey Results</Link>
            </div>
        </div>
    )
};

export default Leaderboard;