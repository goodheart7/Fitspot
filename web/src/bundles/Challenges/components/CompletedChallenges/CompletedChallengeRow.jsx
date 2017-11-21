import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {Link} from 'react-router';

const CompletedChallengeRow = (props) => {
    const {name, description, dtStart, dtEnd, id} = props.challenge;
    return (
        <tr key={name}>
            <td>{name}</td>
            <td>{description}</td>
            <td>{moment(dtStart).format('MMM D')}</td>
            <td>{moment(dtEnd).format('MMM D')}</td>
            <td>
                <Link to={`/challenges/challenge-detail/${id}`}>
                    View Details
                </Link>
            </td>
        </tr>

    )
};

export default CompletedChallengeRow;