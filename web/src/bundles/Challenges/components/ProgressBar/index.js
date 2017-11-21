import React, {Component, PropTypes} from 'react';
import Progress from 'react-progressbar';

const ChallengeProgress = (props) => {
  return(
      <div className="challenge-progress-container">
          <div className="challenge-start">{props.start}</div>
          <Progress color="#5fb13d" completed={props.progress} />
          <div className="challenge-end">{props.end}</div>
      </div>
  )
};

export default ChallengeProgress;