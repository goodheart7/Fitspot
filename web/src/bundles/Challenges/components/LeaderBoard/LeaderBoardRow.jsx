import React, {Component, PropTypes} from 'react';


export default class LeaderBoardRow extends Component{
    constructor(props){
        super(props);
    }
    _rerenderChartData = (e) => {
        this.setState({
            pieChartData: e
        });
        this.props.rerenderChartData(e);
    };
  render(){
      const {name, rang, division, points, pieChartData} = this.props.leader;
      return (
          <tr  key={name} data-tip data-for='happyFace' onMouseOver={(e) => this._rerenderChartData(pieChartData)}>
              <td>{rang}</td>
              <td>{name}</td>
              <td>{division}</td>
              <td className="headcol headcol-td">{points}</td>
          </tr>

      )
  }
};
