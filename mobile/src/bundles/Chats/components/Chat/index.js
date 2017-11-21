import React, {Component} from 'react'
import {Actions} from 'react-native-router-flux'
import {GiftedChat} from 'react-native-gifted-chat';
import {View, Image, Text, StatusBar, TouchableHighlight,ListView,ActivityIndicator} from 'react-native'
import CONSTS from '@utils/Consts'
import events from '@utils/Events'

type Props = {
  sessionId: String,
  messages: Array,
  user: Object,
  isFetching: Boolean,
  markMessagesRead:Function,
  customer : Object,
  trainer : Object
}

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: props.messages
    };
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount(){
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.messages.length > this.state.messages.length){
      this.setState({messages: nextProps.messages})
    }
  }

  onSend(messages = []) {
    var userType = this.props.user.userType === CONSTS.USER_TYPE.TRAINER ? "Trainer" : "Customer";
    var otherType = this.props.user.userType === CONSTS.USER_TYPE.TRAINER ? "Customer" : "Trainer";

    if (this.state.messages.length <= 0) { // this is the first message
      events.track(userType + " " + this.props.user.publicId + " Messaged First", {
        'trainer' : this.props.trainer.id,
        'customer' : this.props.customer.id
      });
    } else if (this.state.messages.filter(msg => msg.user.id !== this.props.user.id).length <= 0) {
      events.track(userType + " First Response To " + otherType + "-led Chat", {
        'trainer' : this.props.trainer.id,
        'customer' : this.props.customer.id
			});
    }
    this.props.sendMessage({sessionId:this.props.sessionId, message: messages[0].text})
  }
  render() {
    return (
      <View style={{flex:1,marginBottom: 50,marginTop:65}}>
        { (!this.props.isFetching) ?
          <GiftedChat messages={this.state.messages} onSend={this.onSend.bind(this)} user={{_id: this.props.user.id}} />
          :
          <ActivityIndicator color="#4C4C4C" size='large' style={{position:'absolute',top:0,bottom:0,left:0,right:0}} />
        }

      </View>
    );
  }
}

export default Chat
