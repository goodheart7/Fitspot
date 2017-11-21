import ReactDOM from 'react-dom';
import React from 'react';
import moment from 'moment'
import { map, sortBy, groupBy } from 'lodash';
import { Link } from 'react-router';

class WorkoutList extends React.Component {

  componentDidUpdate() {
    if (this.props.selectedWorkoutValue && !this.props.flag) {
      const key = this.props.selectedWorkoutValue;
      const node = this[key]
      const domNode = ReactDOM.findDOMNode(node);
      if(domNode) {
        domNode.scrollIntoView();
      }
    }
  }

  render() {
    const imageStyle = {
        background: `url(${require("../../assets/small-calendar.png")})`,
        width: 75,
        height: 75,
        borderRadius: '100%',
        backgroundColor: '#e3e3e3',
        margin: '0 auto 25px auto',
        backgroundSize: '35px 35px',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };
    const workoutItems = this.props.workoutItems;
    const activities = this.props.activities;
    const workoutObj = {};
    const activityObj = {};
    var workoutListGroup = groupBy(this.props.workoutItems, function (item) {
      return moment(item.date).startOf('day').format();
    });
    var workoutList = map(workoutListGroup, function(group, day) {
        var sortedWorkouts = sortBy(group, [function(w) { return moment(w.dtStart).unix() }]);
        return {
            day: day,
            workouts: sortedWorkouts,
        }
    });
    for(let i=0;i<activities.length;i++) {
      activityObj[activities[i].id] = activities[i].name;
    }
    return (
      <div className="container">
        {
          workoutItems.length ? workoutList.map((item, index) => (
                      <div className="container paddingTop50" key={index}>
                        <div className="row">
                          <div className="col-xs-12">
                            <div className="text-center">
                              <h2 className="marginBottom20">{moment(item.day).format("DD MMMM YYYY") }</h2>
                            </div>
                          </div>
                        </div>
                          {
                              item.workouts.map((item, index) => (
                                      <div className="row text-center workout-details cursor-pointer" key={ index } ref={(input) => { this[item] = input; }} onClick={() => this.props.onWorkoutSelect(item, true)}>
                                        <div className="col-1">
                                          <p className="info-boxes"><small>DATE & TIME</small><strong>{moment(item.dtStart).format("ddd DD h:mmA") }</strong></p>
                                        </div>
                                        <div className="col-2">
                                          <p className="info-boxes"><small>TRAINER</small><strong>{item.trainer ? item.trainer.firstName  + " " + item.trainer.lastName[0] : 'Fitspot Choose'}</strong></p>
                                        </div>
                                        <div className="col-3">
                                          <p className="info-boxes"><small>ACTIVITY</small><strong>{activityObj[item.activityId]}</strong></p>
                                        </div>
                                        <div className="col-4">
                                          <p className="info-boxes"><small>LOCATION</small><strong>{item.city}</strong></p>
                                        </div>
                                        <div className="col-5">
                                            {/* <p className="info-link-1"><Link to={{ pathname: "/booking/edit-workout/", query: {rebook: item.id}}}>Rebook {item.trainer ? item.trainer.firstName: ''}</Link></p> */}
                                            <p className="info-link-1"><Link to={{ pathname: "/booking/edit-workout/", query: {edit: item.id}}}>Edit Workout</Link></p>
                                            {
                                                item.trainer ? <p className="info-link-2"><Link to={{ pathname: "/chat/message/" }}>Chat With {item.trainer.firstName}</Link></p> : <div style={{fontSize: 18, paddingTop: 4, fontWeight: 600}} className="text-center">Chat Unavailable</div>
                                            }
                                        </div>
                                      </div>
                                  )
                              )}
                      </div>
                  )
              ) :
              <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center" style={{paddingTop: 60, paddingBottom: 60}}>
                  <div style={imageStyle} className="marginBottom20">

                  </div>
                  <br/>
                  <h3> Workout Calendar </h3>
                  <br/>
                  <p>This screen will show your completed and upcoming workouts</p>
                  <br/>
                  <Link to='/booking/choose-activity/' className="btn btn-default btn-block">Book Your First Workout!</Link>
                </div>
              </div>
        }
      </div>
    );
  }
}

export default WorkoutList;
