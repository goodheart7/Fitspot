import React from 'react';
import * as Actions from '@shared/actions';
import moment from 'moment';
import events from '@utils/Events';

class Profile extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        const {user} = this.props;
        const {customer} = user;
        const age = moment().diff(customer.birthday, 'years');
        let realFeet = customer.height / 30.48;
        const feet = Math.floor(realFeet);
        const inches = Math.round((realFeet - feet) * 12);
        //console.log(user);
        return(
            <div className="container">

                <div className="row marginBottom50">

                    <div className="col-xs-12 kill-left-padding kill-right-padding">

                        <img src={user.avatar ? user.avatar.url : require('@assets/img/default_profile.png')} style={{margin: '0 auto'}} className="img-responsive profile-picture" alt="consumer-name-here" />

                    </div>

                    <div className="col-xs-12 profile-row text-center">

                        <h1><span>000</span>{customer.numWorkouts}<small>WORKOUTS</small></h1>

                    </div>

                    <div className="col-xs-12 profile-row text-center">

                        <h1 className="item-1">{age}<span>y</span><small>AGE</small></h1>
                        <h1 className="item-2">{isNaN(feet) ? 0 : feet}<span>ft </span>{isNaN(inches) ? 0: inches} <span>in </span><small>HEIGHT</small></h1>
                        <h1 className="item-3">{customer.weight}<span>lb</span><small>WEIGHT</small></h1>

                    </div>
                    {/*
                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITNESS GOAL</small>Get Stroger / Get Lean & Toned</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITNESS LEVEL</small>I work out a few times / week</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>BODY FOCUS</small>Back, Abdominals & Legs</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>PREFERRED TRAINER</small>Educator / Teacher, Any Gender</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>MEDICAL ISSUES</small>Lower Back Pain</h2>

                    </div>

                    <div className="col-xs-12 col-sm-6 profile-row">

                        <h2><small>FITSPOT AVERAGE</small>~3 Workouts / Week</h2>

                    </div>
                    */}
                </div>

                <div className="row text-center">
                    <div className="col-xs-12 col-sm-4  col-sm-offset-4">

                        <a href="#" onClick={() => {
                            events.track("Edit Profile Clicked");
                            Actions.editProfile();
                        }} className="btn btn-info btn-lg btn-block">Edit Profile</a>

                    </div>
                </div>

            </div>
        )
    }
}

export default Profile;
