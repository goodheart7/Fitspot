import React from 'react';

const ChallengeGlobalActivities = (props) => {
    return(
        <div className={props.className}>
            <div className="progress">
                <div className="progress-bar progress-orange" role="progressbar" style={{width: '40%'}}>
                </div>
                <div className="progress-bar progress-light-blue" role="progressbar" style={{width: '10%'}}>
                </div>
                <div className="progress-bar progress-purple" role="progressbar" style={{width: '20%'}}>
                </div>
                <div className="progress-bar progress-green" role="progressbar" style={{width: '20%'}}>
                </div>
                <div className="progress-bar progress-gray" role="progressbar" style={{width: '20%'}}>
                </div>
            </div>
            <ul className="global-progress-dots">
                <li>
                    <i className="dot-orange fa fa-circle" />
                    Exercise
                </li>
                <li>
                    <i className="dot-light-blue fa fa-circle" />
                    Workout
                </li>
                <li>
                    <i className="dot-purple fa fa-circle" />
                    Sleep
                </li>
                <li>
                    <i className="dot-green fa fa-circle" />
                    Diet
                </li>
                <li>
                    <i className="dot-gray fa fa-circle" />
                    Other
                </li>
            </ul>
        </div>
    )
};

export default ChallengeGlobalActivities;