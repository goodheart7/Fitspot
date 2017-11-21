import React, {Component} from 'react'
import {connect} from 'react-redux'
import Chat from '@Chat/components/Chat'
import * as Actions from '@shared/actions';
import { sendMessage, sendReadMessages } from '@store/modules/chat/actions'

type Props = {
  messages: Array,
  sessionList: Array,
  sendMessage: Function,
  userId: Integer,
  sendReadMessages: Function
}

class ChatContainer extends Component {
  props: Props

  render() {
    return (<Chat {...this.props}/>)
  }

}

const mapStateToProps = (state, ownProps) => {
  return {
    sessionList: state.chat.sessionList,
    userId: state.auth.user.id,
    messages:state.chat.sessions
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessage(message))
    },
    sendReadMessages: (sessionId) => {
      dispatch(sendReadMessages(sessionId))
    },
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatContainer)
