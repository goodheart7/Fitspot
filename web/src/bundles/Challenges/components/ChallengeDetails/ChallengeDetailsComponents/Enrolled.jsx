import React, {Component, PropTypes} from 'react';
import ChallengeRanking from './LeaderboardComponents/ChallengeRanking';
import { Link } from 'react-router';
const Table = Reactable.Table;
const Thead = Reactable.Thead;
const Tr = Reactable.Tr;
const Td = Reactable.Td;
const Th = Reactable.Th;

const Enrolled = (props) => {
    const ranking = [
        {
            place: 1,
            name: 'The modern Seals',
            size: '6 Participiants',
            office: 'New York',
            joined: '16 Apr'
        },
        {
            place: 2,
            name: 'The Red Rockets',
            size: '6 Participiants',
            office: 'New York',
            joined: '16 Apr'
        },
        {
            place: 3,
            name: 'The modern Seals',
            size: '6 Participiants',
            office: 'New York',
            joined: '16 Apr'
        },
        {
            place: 4,
            name: 'The modern Seals',
            size: '6 Participiants',
            office: 'New York',
            joined: '16 Apr'
        },
        {
            place: 5,
            name: 'The modern Seals',
            size: '6 Participiants',
            office: 'New York',
            joined: '16 Apr'
        },
        ]
    const row = ranking.map(row => {
        return(
            <Tr id={row.place} key={row.place} onClick={() => this.expandRow(row.place)}>
                <Td column="place">
                    {row.place}
                </Td>
                <Td column="name">
                    {row.name}
                </Td>
                <Td column="size">
                    {row.size}
                </Td>
                <Td column="office">
                    {row.office}
                </Td>
                <Td column="joined">
                    {row.joined}
                </Td>
                <Td column="actions">
                    <Link to="#">All Entries</Link>
                </Td>
            </Tr>
        )
    });
    return (
        <div className="col-xs-12">
            <Table className="table table-striped" sortable={[
                'place',
                'name',
                'points',
                'division',
                'office'
            ]} defaultSort={{column: 'place', direction: 'asc'}}>
                <Thead>
                <Th column="place">
                    #
                </Th>
                <Th column="name">
                    Team
                </Th>
                <Th column="size">
                    Size
                </Th>
                <Th column="office">
                    Office
                </Th>
                <Th column="joined">
                    Joined
                </Th>
                </Thead>
                {row}
            </Table>
            <div className="text-center col-xs-12 col-sm-6 col-sm-offset-3" style={{marginTop: 35}}>
                <Link to="#" className="btn btn-info btn-block">Send Reminder</Link>
            </div>
        </div>
    )
};

export default Enrolled;