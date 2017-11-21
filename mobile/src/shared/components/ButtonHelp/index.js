/* @flow */

import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import {Actions} from 'react-native-router-flux'
import styles from './styles'
import events from '@utils/Events'

type Props = {
  style : Object,
  onPress : Function,
  buttonName?: string,
  eventProps?: Object,
  track?: bool
}

const ButtonHelp = (props: Props) => {
  const { onPress } = props;
  const style = props.style || styles.backButton;
  const buttonName = props.buttonName || 'Refer';
  const eventProps = props.eventProps || {};
  const track = props.track || props.buttonName || props.eventProps || false;

  return (
    <TouchableHighlight
      style={style}
      underlayColor={'#00000000'}
      onPress={() => {
        if (track && buttonName != null && buttonName !== "") {
          events.track(buttonName + " Button Tapped", eventProps);
        }
        onPress();
      }}
    >
      <Image
        style={styles.backButtonImage}
        source={require('../../images/help-icon.png')}
      />
    </TouchableHighlight>
  )
}

export default ButtonHelp
