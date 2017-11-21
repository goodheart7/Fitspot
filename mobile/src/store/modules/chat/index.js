import Utils from '@utils/Utils'

import * as actions from './actions'

const initialState = {
  sessionList: [],
  sessions: {},
}

export default function chat(state = initialState,action){
  switch (action.type) {

    case actions.CHAT_RESET_STATE:
      return {
        ...state,
        initialState,
        isFetching: false,
        error: null,
      };

    case actions.FETCH_CHAT_SUCCESS:
    return Object.assign({}, state, {
        isFetching: false,
        sessionList: action.sessions
      })

      case actions.READ_MESSAGES_SUCCESS:
      return {
          ...state,
          isFetching: false,
          sessionList: state.sessionList.map(sessionItem => sessionItem.sessionId === action.sessionId ?
              // transform the one with a matching id
              { ...sessionItem, ...action.session } :
              // otherwise return original todo
              sessionItem
          )
      }


      case actions.ADD_MESSAGE:

      return Object.assign({}, state, {
          isFetching: false,
        })


      case actions.ADD_SOCKET_MESSAGE:

      var currentSessions = state.sessions
      if(typeof currentSessions[action.message.sessionId] === 'undefined'){
        currentSessions[action.message.sessionId] = []
      }
      var messageSession = currentSessions[action.message.sessionId].slice()


      messageSession.unshift(action.message)
      // can't do. currentSessions[action.message.sessionId] = messageSession
      var sessionList = state.sessionList.slice()
      for (session of sessionList) {
        if(session.sessionId == action.message.sessionId){
          session.lastMessageDate = action.message.createdAt
          session.lastReadDate = action.message.createdAt
          break;
        }

      }

      var newSessionList = Utils.sortByKey(sessionList,'lastMessageDate')


      return {
        ... state,
        sessionList: sessionList,
        sessions : {
          ...state.sessions,
          [action.message.sessionId]: [
            ...messageSession
          ]
        }
      }


      case actions.ADD_MESSAGE_SUCCESS:


            var currentSessions = state.sessions
            if(typeof currentSessions[action.message.sessionId] === 'undefined'){
              currentSessions[action.message.sessionId] = []
            }
            var messageSession = currentSessions[action.message.sessionId].slice()


            messageSession.unshift(action.message)
            // can't do. currentSessions[action.message.sessionId] = messageSession
            var sessionList = state.sessionList.slice()
            for (session of sessionList) {
              if(session.sessionId == action.message.sessionId){
                session.lastMessageDate = action.message.createdAt
                session.lastReadDate = action.message.createdAt
                break;
              }

            }

            var newSessionList = Utils.sortByKey(sessionList,'lastMessageDate')


            return {
              ... state,
              sessionList: sessionList,
              sessions : {
                ...state.sessions,
                [action.message.sessionId]: [
                  ...messageSession
                ]
              }
            }


      case actions.ADD_MESSAGE_FAILURE:

      return Object.assign({}, state, {
          isFetching: false,
        })


        case actions.FETCH_CHAT_MESSAGES:

        return Object.assign({}, state, {
            isFetching: true,
          })

        case actions.FETCH_CHAT_MESSAGES_SUCCESS:


          return {
            ... state,
            sessions : {
              ...state.sessions,
              [action.sessionId]: [
                ...action.messages
              ]
            },
            isFetching:false,
          }

        case actions.FETCH_CHAT_MESSAGES_FAILURE:

        return Object.assign({}, state, {
            isFetching: false,
            sessions: action.sessions
          })

    default:
      return state
  }
  return state;
}
