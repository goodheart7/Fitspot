import React from 'react'
import {AppState, View, Image, Text, StatusBar, TouchableHighlight} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Logo from '@components/Logo'
import Link from '@components/Link'
import Button from '@components/Button'
import styles from './styles'
import Video from 'react-native-video'
import events from '@utils/Events'

type Props = {
  setUserTypeCustomer: Function,
  setUserTypeTrainer: Function,
}

  class Launch extends React.Component {

    props:Props

    state = {
      appState : AppState.currentState
    }

    constructor(props){
      super(props);
      events.track("App Launched");
    }

    componentDidMount() {
      AppState.addEventListener('change', this._onAppStateChange);
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._onAppStateChange);
    }

    _onAppStateChange = (nextAppState) => {
      if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
        events.track("App Resumed");
      }
      this.setState({appState : nextAppState});
    }

    chooseTrainer(){
      this.props.setUserTypeTrainer()
      Actions.loginModal()
    }

    chooseCustomer(){
      this.props.setUserTypeCustomer()
      Actions.loginModal()
    }

    render(){
      return (
        <View style={styles.container}>
        <Video source={require('../../assets/bg_video.mp4')}
             style={styles.backgroundVideo}
             muted={true}
             repeat={true}
             resizeMode="cover"  />
          <StatusBar barStyle='light-content'/>
          <Logo useLarge={true} styles={styles.logoImage}/>
          <Text style={styles.textBlock}>
            Fitspot helps you achieve your fitness goals by matching you with personal trainers around you.
          </Text>
          <View style={styles.buttonContainer}>
            <View style={{width: 270, height: 50}}>
              <Button buttonStyle={styles.registerButton} buttonTextStyle={styles.registerButtonText} onPress={()=> this.chooseCustomer()}>Let's Get Started</Button>
            </View>

            <View style={{width: 270, height: 50}}>

            {/*<Link style={styles.linkStyle} onPress={() => this.chooseTrainer() }>I'm a trainer</Link>*/}

            </View>
          </View>
        </View>
      )
    }
}

export default Launch
