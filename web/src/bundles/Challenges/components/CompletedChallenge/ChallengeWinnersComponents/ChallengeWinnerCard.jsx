import React from 'react';

const ChallengeWinnerCard = (props) => {
    const winner = () => {
        let laurel = null;
        switch (props.winner.place) {
            case 1:
                laurel = require('../../../assets/gold.png');
                return (
                    <div className="col-xs-12 col-sm-4 text-center">
                        <div className='winner-box' style={{background: `url(${laurel})`}}>
                            <div className="winner-image" style={{background: `url(${props.winner.avatar})`}}/>
                        </div>
                        <strong>{props.winner.name}</strong>
                        <div className="winner-place"><small>1st Place</small></div>
                    </div>
                );
            case 2:
                laurel = require('../../../assets/silver.png');
                return (
                    <div className="col-xs-12 col-sm-4 text-center">
                        <div className='winner-box' style={{background: `url(${laurel})`}}>
                            <div className="winner-image" style={{background: `url(${props.winner.avatar})`}} />
                        </div>
                        <strong>{props.winner.name}</strong>
                        <div className="winner-place"><small>2nd Place</small></div>
                    </div>
                );
            case 3:
                laurel = require('../../../assets/bronze.png');
                return (
                    <div className="col-xs-12 col-sm-4 text-center">
                        <div className='winner-box' style={{background: `url(${laurel})`}}>
                            <div className="winner-image" style={{background: `url(${props.winner.avatar})`}}/>
                        </div>
                        <strong>{props.winner.name}</strong>
                        <div className="winner-place"><small>3rd Place</small></div>
                    </div>
                );

            default:
                return (<div></div>)
        }
    }
    return(
        winner()
    )
};

export default ChallengeWinnerCard;