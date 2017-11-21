import React, {Component, PropTypes} from 'react';
import CONSTS from '@utils/Consts';
import moment from 'moment';
import DateTimeForm from '@Booking/components/ChooseDateTime/DateTimeForm';
import { Link } from 'react-router';
import { sortBy } from 'lodash';

type Props = {
    plans : Array,
    bookingState : object,
}

class EditWorkout extends React.Component {
    constructor(props) {
        super(props);
        let workout = sortBy(this.props.workouts.workoutItems, [function(w) { return moment(w.dtStart).unix() }])[0];;
        this.state = {
          showDate: false,
          date: workout.dtStart,
          workout : workout,
        };
        this.onContinueClick = this.onContinueClick.bind(this);
    }
    onContinueClick(form) {
      let newTime = moment(moment(form.day).format('MM/DD/YYYY') +' '+ (moment(form.time).isValid() ?
              moment(form.time).format('h:mm a') :
              form.time), 'MM-DD-YYYY h:mm a');
        //using moment lib for format our date timestamp
      this.setState({date : newTime, showDate: false});
    }
    changeDateVisible() {
       this.setState({showDate: !this.state.showDate})
    }

    renderChangeDate() {
      if(this.state.showDate) {
          var initialValues = { //pass initial values for edit workout
              day: moment(this.state.date).toString(),
              time: moment(this.state.date).toString()
          };
        return (
          <div className="workout-row">
            <DateTimeForm initialValues={initialValues} title='Change Date' onSubmit={this.onContinueClick}/>
          </div>
        )
      }
    }

    rebook = (form, workout) => {
        let date = moment(moment(form.day).format('MM/DD/YYYY') +' '+ (moment(form.time).isValid() ?
                moment(form.time).format('h:mm a') :
                form.time), 'MM-DD-YYYY h:mm a');
        this.props.onRequestWorkoutChange(workout, date);
    }

    render() {

        const { info } = this.props.location.query;
        const { rebook } = this.props.location.query;
        const { edit } = this.props.location.query;
        const id = info || rebook;
        const { workoutItems } = this.props.workouts;
        let item = id && workoutItems.find(item => {
                return item.id == id
            });
        let workout = edit ? workoutItems.find(item => (item.id == edit)) : this.state.workout;

        let trainerName = workout.trainer === null ? 'Fitspot Choose' : workout.trainer.firstName + ' ' + workout.trainer.lastName.slice(0,1);
        let locationName = workout.gym ? workout.gym.name : workout.address;
        return (
          <div className="container">

            <div className="row">

                {rebook ?
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                        <div className="workout-row">

                            <h4><small>TRAINER</small>{trainerName}</h4>

                        </div>
                        <div className="workout-row">

                            <h4><small>LOCATION</small>{locationName}</h4>

                        </div>
                        <div className="workout-row">
                            <DateTimeForm initialValues={{day: moment(item.dtStart).toString(), time: moment(item.dtStart).toString()}} title='Rebook' onSubmit={(form) => this.rebook(form, workout.id)}/>
                        </div>
                        <div className="workout-row">
                            <Link to="/calendar/activities/" type="button" className="btn btn-danger btn-lg btn-block"
                            >Back</Link>
                        </div>
                    </div>
                    :
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">

                        <div className="workout-row">

                            <h4><small>ACTIVITY</small>Strength</h4>

                        </div>

                        <div className="workout-row">

                            <h4><small>TRAINER</small>{trainerName}</h4>

                        </div>

                        <div className="workout-row">

                            <h4><small>DATE & TIME</small>{item ? moment(workout.dtStart).format('MMM DD h:mm a') : moment(this.state.date).format("MMM DD h:mm a")}</h4>
                            {!item && <a href="#" className="btn btn-info btn-sm marginBottom20" onClick={() => this.changeDateVisible()}>Change</a>}

                        </div>

                        {this.renderChangeDate()}

                        <div className="workout-row">

                            <h4><small>LOCATION</small>{locationName}</h4>

                        </div>

                        <div className="workout-row">

                            <h4><small>FRIENDS</small>+{workout.numFriends} Participants</h4>

                        </div>

                        {!item && <button type="button" className="btn btn-info btn-lg btn-block marginBottom20"
                                          onClick={() => this.props.onRequestWorkoutChange(workout.id, this.state.date)}>Save Changes</button>}

                        {!item ?
                            <button type="button" className="btn btn-danger btn-lg btn-block"
                                    onClick={() => this.props.onCancelWorkout(workout.id)}>Cancel Workout</button> :
                            <Link to="/calendar/activities/" type="button" className="btn btn-danger btn-lg btn-block"
                            >Back</Link>}

                    </div>}

              </div>

          </div>
        )
    }
}

export default EditWorkout;
