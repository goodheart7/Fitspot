/* @flow */

import React from 'react'
import { TouchableHighlight, Text } from 'react-native'
import styles from './styles'
import events from '@utils/Events'

type Props = {
  children?: string,
  onPress: Function,
  buttonStyle: Object,
  buttonTextStyle: Object,
	buttonName?: string,
  eventProps?: Object,
  track?: bool
}

const Button = (props: Props) => {
  const { onPress } = props;
  const children = props.children || '';
  const style = props.buttonStyle || styles.buttonStyle;
  const textStyle = props.buttonTextStyle || styles.buttonTextStyle;
	const buttonName = props.buttonName || props.children;
  const eventProps = props.eventProps || {};
  const track = props.track || props.buttonName || props.eventProps || false;

  return (
    <TouchableHighlight style={style} underlayColor={'#00000000'} onPress={() => {
			if (track && buttonName != null && buttonName !== "") {
				events.track(buttonName + " Button Tapped", eventProps);
			}
			onPress();
    }}>
      <Text style={textStyle}>{children}</Text>
    </TouchableHighlight>
  )
}

export default Button
