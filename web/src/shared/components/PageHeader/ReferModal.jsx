import React from 'react';
import {DEFAULT_GREEN_COLOR,DEFAULT_GREY_COLOR} from '@theme/colors'
import events from '@utils/Events'

const learnMoreURL = 'http://www.fitspotapp.com/at-work';
const giftCardURL = 'http://www.fitspotapp.com/gift-cards';

const ReferModal = (props) => {
  const { user, onClick, onSendToFriendClick } = props;
  const FriendEmailSubject = "Save $20 on yoga, circuit training, and other personal training sessions with Fitspot"
  const FriendEmailTemplate = `Hey, use my referral code: ${user.publicId} to save $20 on any of Fitspot's workouts.`
  const HREmailSubject = "Save 20% on first Fitspot Team Workout!"
  const HREmailTemplate = `Mention my referral code: ${user.publicId}, to receive 20% off on our first team customized workout with vetted, insured, certified personal trainers that come to you across a wide variety of activities: yoga, massage, circuit training, kickboxing, and more. Fitspot is a benefit that employees enjoy and its one that can bring corporate wellness ROI. Learn more here: www.fitspotapp.com/at-work and call for a free consultation: 415-320-6972.`

  let mailtoLink = (subject, body) => {
    return "mailto:?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  return (
    <div className="modal fade" id="referModal" tabIndex="-1" role="dialog" aria-labelledby="referModalLabel">
      <div className="modal-dialog" role="document">
        <div className="modal-content margin10">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="modal-body text-center">
            <div className="refer-row refer-code ">
              <p style={{color: '#777'}}> Your Unique Referral code: </p>
              <h3>{user.publicId.toUpperCase()}</h3>
            </div>
            <div className="refer-row">
              <h3>Refer Friends</h3>
              <p style={{color: '#777'}}> Refer a friend to get
                  <strong style={{color: DEFAULT_GREEN_COLOR}}> $20 off </strong>
                  of your and your friends's next session!
              </p>
              <a href={mailtoLink(FriendEmailSubject, FriendEmailTemplate)} className="btn btn-info"
                 onClick={() => {events.track("Refer Friend Clicked", {'media' : 'email'});}}
              >
                Send To Friends
              </a>
            </div>
            <div className="refer-row">
              <h3>Refer Your Employer</h3>
              <p style={{color: '#777'}}> <a href={learnMoreURL}>Learn about </a>
                how to get team workouts for free as a benefit through your employer! If your employer signs up, you get three personal sessions <strong style={{color: DEFAULT_GREEN_COLOR}}> free! </strong>
              </p>
              <a href={mailtoLink(HREmailSubject, HREmailTemplate)} className="btn btn-info"
                 onClick={() => {events.track("Refer Employer Clicked", {'media' : 'email'});}}
              >
                Send To HR
              </a>
            </div>
            <div className="refer-row">
              <h3>Gift Card</h3>
              <p style={{color: '#777'}}> Spread the
                <strong style={{color: DEFAULT_GREEN_COLOR}}> Gift of Fit. </strong>
                Gift a loved one free sessions!
              </p>
              <a href={giftCardURL} target="_blank" className="btn btn-info"
                 onClick={() => {events.track("Gift Fitspot Clicked");}}
              >
                Gift Fitspot
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferModal;
