import React from 'react'
import { connect } from 'react-redux'
import { Router, Reducer } from 'react-native-router-flux'
import scenes from './scenes'
const config = require('@config');
import FitSpotSocketClient from './sockets'
// import FitSpotSocketClient from './sockets'
import { addSocketMessage } from '@store/modules/chat/actions'
import events from '@utils/Events'

type Props = {
  currentUser: Array,
  authToken:String,
  addChatMessage: Function,
}

class FitSpotRouter extends React.Component{
  props: Props


  constructor(props){
    super(props)
    this.state = {
      authToken: props.authToken,
      counter: 125,
    }

  }

  componentWillReceiveProps(nextProps){

    if(nextProps.authToken !== '' && nextProps.authToken !== this.state.authToken){
      this.setState({authToken: nextProps.authToken})
      this.close();
      // var sc = new FitSpotSocketClient(nextProps.authToken)
      this.initWS()
      // this.setState({socketClient: sc})
    }
  }

  initWS(){
    ws = new WebSocket(config.wsUrl);
   ws.onopen = () => {
     // connection opened
     ws.send(JSON.stringify({
       type: 'auth',
       token: this.state.authToken
     })); // send a message
   };

   ws.onmessage = (e) => {
     // a message was received


     var data = JSON.parse(e.data)

     if(data.type === 'ping'){
       ws.send(JSON.stringify({
         type: 'pong'
       }));
     }

     else if(data.type === 'message'){
       console.log('ws message: ' + e.data);

       this.setState({counter: this.state.counter + 1})
       var dataStub = ''
       if(data.data === "HELLOOOO"){
         dataStub = JSON.parse('{"id": '+ this.state.counter  +',"text": "New High","createdAt": "2017-03-31T09:33:36.358062 Z","user": {"id": 56,"name": "Randy Savage","avatar": {"url": "http://localhost:3000/static/upload/379/490/mazpystq.jpg"}},"sessionId": 1}')
       }else{
         dataStub = data.data
       }
       var url = dataStub.user.avatar.url
       var chatId = dataStub.id
       dataStub._id = chatId;
       dataStub.user.avatar = url
       dataStub.user._id = dataStub.user.id
       console.log('received new message')
       this.props.addChatMessage(dataStub)

     }

   };

   ws.onerror = (e) => {
     // an error occurred
     console.log('ws error: ' + e.message);
   };

   ws.onclose = (e) => {
     // connection closed
     console.log(e.code, e.reason);
   };
  }
  close(){
    if(typeof ws !== 'undefined'){
      ws.close();
    }

  }

  render(){
    let lastPage = null;

    const middleReducer = params => {
      const defaultReducer = Reducer(params);
      return (state, action) => {
        if ('scene' in action && 'title' in action.scene) {
          currPage = action.scene.sceneKey;
          if (currPage !== lastPage) {
            pageName = action.scene.title === "" ? action.scene.sceneKey : action.scene.title;
            events.screen(pageName, {'sceneKey' : action.scene.sceneKey});
          }
          lastPage = action.scene.sceneKey;
        }
        return defaultReducer(state, action);
      }
    }
    return (
      <Router key={`${this.props.currentUser.userType}`} scenes={scenes} createReducer={middleReducer} />
    )
  }


}




const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.user,
    authToken: state.auth.authToken,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addChatMessage: (message) => {
      dispatch(addSocketMessage(message))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(FitSpotRouter)
