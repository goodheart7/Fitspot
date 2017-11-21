import React from 'react';
import moment from 'moment'
import Utils from '@utils/Utils'
import * as Actions from '@shared/actions';
import events from '@utils/Events';

type Props = {
  sessionId: Integer,
  name: String,
  sessionList: Array,
  messages: Array,
  userId: Integer,
}

const style= {
  pos: {paddingBottom: "48px"},
  enableNewMsgNtf: {display: 'inherit'},
  disableNewMsgNtf: {display: 'none'},
  modal:{
    display: "block",
    backgroundColor: "rgba(255,255,255,0.8)",
    opacity: 1
  },
  modalcontent:{
    background: "transparent"
  },
  img:{
    marginTop: "120px"
  }
};


class Chat extends React.Component {
  constructor(props) {
    super(props);
    const sessionlists = Utils.sortByKey(this.props.sessionList,'lastMessageDate');
    this.state={
      sessionList : sessionlists,
      sessionId : ((this.props.sessionId)?(this.props.sessionId):((sessionlists[0])?(sessionlists[0].sessionId):(undefined))),
      oppName: ((this.props.name)?(this.props.name):((sessionlists[0])?(sessionlists[0].trainer.name):(undefined))),
      text: "",
      messages: this.props.messages
    };
    this.props.sendReadMessages(this.state.sessionId);
  }

  smallRender(msgUser)
  {
    return (
      <div className={"col-xs-3 mobile-user-list " + ((this.state.sessionId==msgUser.sessionId)?('active'):(''))} onClick={this.setUser.bind(this, msgUser.sessionId, msgUser.trainer.name)}>

        <div className="user-img-frame">

          <span className="new-message-notification" style={msgUser.userUnreadMessagesNumber > 0 ? style.enableNewMsgNtf : style.disableNewMsgNtf}>{msgUser.userUnreadMessagesNumber}</span>
          <img className="messages-user-img" src={((msgUser.trainer.avatar)?(msgUser.trainer.avatar.url): require('@assets/img/default_profile.png'))} alt="user-name"/>

        </div>

        <h2 className="user-title">{msgUser.trainer.name}</h2>

      </div>
    )
  }

  bigRender(msgUser)
  {
    return (
        <div className={"messages-user " + ((this.state.sessionId==msgUser.sessionId)?('active'):(''))} onClick={this.setUser.bind(this, msgUser.sessionId, msgUser.trainer.name)}>

          <div className="user-img-frame">

            <span className="new-message-notification" style={msgUser.userUnreadMessagesNumber > 0 ? style.enableNewMsgNtf : style.disableNewMsgNtf}>{msgUser.userUnreadMessagesNumber}</span>
            <img className="messages-user-img" src={((msgUser.trainer.avatar)?(msgUser.trainer.avatar.url):require('@assets/img/default_profile.png'))} alt="user-name"/>

          </div>

          <h2 className="user-title">{msgUser.trainer.name} <small>{moment(new Date(msgUser.lastMessageDate.replace(/\s/g, ''))).fromNow().toUpperCase()}</small></h2>
          <p className="user-status">{((msgUser.lastMessage)?(msgUser.lastMessage.text):(""))}</p>

        </div>
    )
  }

  setUser(sessionId, name, event){
    this.props.sendReadMessages(sessionId);
    this.setState({
      sessionId:sessionId,
      oppName:name
    });
  }

  renderContent(messages)
  {
    if(!messages) return <div>No messages</div>;
    let row = [];
    row.push(
      <h3 className="chat-title text-center">{this.state.oppName}</h3>
    );
    const flag = this.props.userId;
    const mess = Utils.sortByKey(messages,'createdAt')
    //for (let i = (( 5 > mess.length)?(mess.length-1):(5)); i>=0; i-- )
    for (let i = mess.length-1; i>=0; i-- )
    {
      const newdate=new Date(mess[i].createdAt.replace(/\s/g, ''));
      row.push(<p className="time-bubble text-center text-muted">{moment(newdate).format("DD MMM, LT")}</p>);
      if(mess[i].user.id== flag ) {
        row.push(
            <div className="chat-group-right">
              <p><span className="chat-group-item green">{mess[i].text}</span></p>
            </div>
        );
      }
      else {
        row.push(
            <div className="chat-group-left">
              <p><span className="chat-group-item">{mess[i].text}</span></p>
            </div>
        );
      }
    }
    return row;
  }

  handleKeyPress(sessionId, e) {
    if (e.key === 'Enter') {
      const message ={
        message:e.target.value,
        sessionId: sessionId
      }

      this.props.sendMessage(message);

      var thisSession = null;
      for (var i=0; i<this.state.sessionList.length; i++) {
        if(this.state.sessionList[i].sessionId === sessionId) {
          thisSession = this.state.sessionList[i];
          break;
        }
      }
      if (thisSession !== null ) {
          var userType = thisSession.customer.id === this.props.userId ? "Customer" : "Trainer";
          var otherType = thisSession.customer.id === this.props.userId ? "Trainer" : "Customer";
          if (!(sessionId in this.state.messages) || this.state.messages[sessionId].length <= 0) {
              events.track(userType + " " + this.props.user.publicId + " Messaged First", {
                  'trainer' : thisSession.trainer.id,
                  'customer' : thisSession.customer.id
              });
          } else if ((sessionId in this.state.messages) && (this.state.messages[sessionId].filter(msg => msg.user.id !== this.props.userId).length <= 0)) {
              events.track(userType + " First Response To " + otherType + "-led Chat", {
                  'trainer' : thisSession.trainer.id,
                  'customer' : thisSession.customer.id
              });
          }
      }

      const newText={
        sessionId:this.state.sessionId,
        createdAt:new Date().toISOString(),
        text:e.target.value,
        user:{
          id: this.props.userId,
          avatar:undefined,
          name:this.state.oppName
        }
      };
      const prevMessage=this.state.messages;
      prevMessage[this.state.sessionId].push(newText);
      this.setState({
        messages: prevMessage
      });
      e.target.value="";
    }
  }

  render() {
    const {sessionList} = this.state;
    let row = [];
      row.push(
        <div className="modal fade" id="referModal" tabIndex="-1" role="dialog" aria-labelledby="referModalLabel" style={style.modal}>
          <div className="modal-dialog" role="document">
            <div className="modal-content margin10" style={style.modalcontent}>
              <div className="modal-body text-center">
                <img src={require("../../assets/chat.png")} style={style.img}/>
                <br/>
                <h3> No Conversations Available </h3>
                <br/>
                <p> Book a workout session with our instructors to chat with them. Or refer your employer to chat with co-workers. </p>
                <br/>
                <button className="btn btn-default btn-block" onClick={Actions.chooseActivity}>Book A Workout</button>
                <br/>
                <button className="btn btn-info btn-block" onClick={Actions.earnFreeWorkouts}>Or get free team workouts through your employer</button>
              </div>
            </div>
          </div>
        </div>
      );


    return(
      <div className="container messages">
          { sessionList.length ? <div>
                <div className="row visible-sm visible-xs">

                    {this.state.sessionList.map((msgUser, i) => this.smallRender(msgUser))}

                </div>
                <div className="row">

                  <div className="col-md-3 user-list hidden-xs hidden-sm kill-left-padding kill-right-padding">
                      {this.state.sessionList.map((msgUser, i) => this.bigRender(msgUser))}
                  </div>

                  <div className="col-md-9 col-sm-12 chat-container">

                    <div style={style.pos}>
                        {((this.state.messages[this.state.sessionId])?(this.renderContent(this.state.messages[this.state.sessionId])):(""))}
                    </div>

                    <div>
                      <input type="text" ref={"sendMessage"} className="send-message" id="sendMessage" placeholder="Type a message..." onKeyPress={this.handleKeyPress.bind(this, this.state.sessionId)} defaultValue={this.state.text} />
                    </div>

                  </div>

                </div>
              </div> : <div className="row">
                <div className="col-xs-12 col-sm-6 col-sm-offset-3 text-center">
                  <img src={require("../../assets/chat.png")} style={{marginBottom: 25}}/>
                  <br/>
                  <h3> No Conversations Available </h3>
                  <br/>
                  <p> Book a workout session with our instructors to chat with them. Or refer your employer to chat with co-workers. </p>
                  <br/>
                  <button className="btn btn-default btn-block" onClick={Actions.chooseActivity}>Book A Workout</button>
                  <br/>
                  <button className="btn btn-info btn-block" onClick={Actions.earnFreeWorkouts}>Or get free team workouts through your employer</button>
                </div>
              </div> }
      </div>
    )
  }
}

export default Chat;
