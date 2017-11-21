import React from 'react';
import ChallengeWinnerCard from './ChallengeWinnersComponents/ChallengeWinnerCard';
import {Link} from 'react-router';

const ChallengeWinners = (props) => {
    const winner = props.winner.map(winner => {
       return (
           <ChallengeWinnerCard  winner={winner} />
       )
    });
    return(
        <div className="col-xs-12 col-sm-4 col-sm-offset-4">
            <div className="text-center">
                <h3>Winners</h3>

                <div className="winners-cards-container">
                    <div className="row">
                       {winner}
                    </div>
                </div>
                <div style={{marginTop: 35, marginBottom: 35}} className="col-xs-12 col-sm-6 col-sm-offset-3">
                    <Link to='/challenges/completed-challenge/prizes/' className="btn btn-info btn-block">View Prizes</Link>
                </div>
            </div>
        </div>
    )
};

export default ChallengeWinners;