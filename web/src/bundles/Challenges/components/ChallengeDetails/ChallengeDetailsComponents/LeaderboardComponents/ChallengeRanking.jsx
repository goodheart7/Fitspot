import React, {Component, PropTypes} from 'react';
import ChallengeGlobalActivities from './ChallengeGlobalActivities';


export default class ChallengeRanking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sorted: {
                id: true,
                name: true
            },
            fullName: '',
            leaders: props.leaders
        }
    }

    expandRow (e) {
        const {fullName} = this.state;
        if(fullName == e.fullName) {
            this.setState({fullName: ''});
        }else {
            this.setState({fullName: e.fullName});
        }

    }
    sort(type) {
        const { leaders } = this.state;
        const isSorted = this.state.sorted[type];
        let direction = isSorted ? 1 : -1;
        const sorted = [].slice.call(leaders).sort((a, b) => {
            if (a[type] === b[type]) { return 0; }
            return a[type] > b[type] ? direction : direction * -1;
        });
        this.state.sorted[type] = !isSorted;
        this.setState({
            leaders: sorted
        });
    }
    render() {
        const leaders = this.props.leaders.sort((a, b) => (a.points < b.points));
        const row = leaders.map((row, index) => {
            return(
                <tbody>
                <tr key={index}>
                    <td>
                        {index + 1}
                    </td>
                    <td>{row.fullName}</td>
                    <td>{row.points ? row.points : 0}</td>
                    <td>{row.department}</td>
                    <td>New York</td>
                    <td>
                        <button onClick={() => this.expandRow(row)} className="btn-link" style={{fontWeight: 600}}>
                            <span style={{marginRight: 5}}>Details</span>
                            {row.fullName === this.state.fullName ? <i className="fa fa-caret-down" /> : <i className="fa fa-caret-up"></i>}
                        </button>
                    </td>
                </tr>
                {row.fullName === this.state.fullName && <tr>
                    <td colSpan="6">
                        <ChallengeGlobalActivities className="table-activity" />
                    </td>
                </tr>}
                </tbody>
            )
        });
        return(
            <div>
                <h3 className="text-center marginBottom20">Challenge Rankng</h3>
                {row.length ? <table className="table table-striped table-custom table-expand">
                        <thead>
                        <tr>
                            <th onClick={() => this.sort('place')}>#</th>
                            <th onClick={() => this.sort('name')}>Name</th>
                            <th onClick={() => this.sort('points')}>Points</th>
                            <th onClick={() => this.sort('division')}>Division</th>
                            <th onClick={() => this.sort('office')}>Office</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        {row}
                    </table> : <h4 className="text-center">Be first!</h4>}
            </div>
        )
    }
};
