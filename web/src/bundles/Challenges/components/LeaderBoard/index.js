import React, {Component, PropTypes} from 'react';
import LeaderBoardRow from './LeaderBoardRow';
var PieChart = require("react-chartjs").Pie;
import Tooltip from 'react-tooltip';
const leaders = [
    {
        rang: 1,
        name: 'John Smith',
        division: 'Product',
        points: 13,
        pieChartData: [
            {
                color: '#5fb13d',
                label: 'Red',
                value: 132
            },
            {
                color: '#e3e3e3',
                label: 'Red',
                value: 92
            }
        ]
    },
    {
        rang: 2,
        name: 'John Qwertt',
        division: 'Finance',
        points: 33,
        pieChartData: [
            {
                color: '#5fb13d',
                label: 'Red',
                value: 94
            },
            {
                color: '#e3e3e3',
                label: 'Red',
                value: 150
            }
        ]
    },
    {
        rang: 3,
        name: 'John Marketing',
        division: 'Marketing',
        points: 13,
        pieChartData: [
            {
                color: '#5fb13d',
                label: 'Red',
                value: 132
            },
            {
                color: '#e3e3e3',
                label: 'Red',
                value: 92
            }
        ]
    },
    {
        rang: 4,
        name: 'John Strategy',
        division: 'Strategy',
        points: 53,
        pieChartData: [
            {
                color: '##5fb13d',
                label: 'Red',
                value: 132
            },
            {
                color: '#e3e3e3',
                label: 'Red',
                value: 92
            }
        ]
    },
    {
        rang: 5,
        name: 'John Operations',
        division: 'Operations',
        points: 23,
        pieChartData: [
            {
                color: '#5fb13d',
                label: 'Red',
                value: 243
            },
            {
                color: '#e3e3e3',
                label: 'Red',
                value: 132
            }
        ]
    }
]; //example data
const options = {
    tooltipTemplate: "<%= value %>",
    onAnimationComplete: function () {
        this.showTooltip(this.segments, true);
    },
    tooltipEvents: [],
    showTooltips: true,
};
export default class LeaderBoard extends Component {
    static propTypes = {
        leaders: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            pieChartData: null
        }
    }
    rerenderChartData = (e) => {
        this.setState({
            pieChartData: e
        });
    }
    render() {
        const leader = leaders.map((leader) => {
            return(
                <LeaderBoardRow leader={leader} rerenderChartData={(e) => this.rerenderChartData(e)} />
            )
        });
        return (
            <div className="col-xs-12 col-sm-6 ">
                <div className="text-center relative">
                    <h2 className="fw500">Leaderboard</h2>
                </div>
                <div className="sticky-table">
                    <Tooltip id='happyFace' type="light" className="light">
                        <PieChart data={this.state.pieChartData} options={options}/>
                    </Tooltip>
                    <table className="table table-striped table-hover">
                        <thead>
                        <tr>
                            <th>Rang</th>
                            <th>Name</th>
                            <th>Division</th>
                            <th className="headcol headcol-th">Points</th>
                        </tr>
                        </thead>
                        <tbody>
                        {leader}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}