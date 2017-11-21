/* @flow */
import React from 'react'
import {View, Text, TextInput, ScrollView, Platform} from 'react-native'
import {Actions} from 'react-native-router-flux'
import Title from '@components/Title'
import Link from '@components/Link'
import Button from '@components/Button'
import GreenBackButton from '@components/GreenBackButton'
import HorizontalLine from '@components/HorizontalLine'
import SegmentedControl from '@components/SegmentedControl'
import NavigationSteps from '@components/NavigationSteps'
import DatePicker from 'react-native-datepicker'
import styles from './styles'
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import ImagePicker from 'react-native-image-picker'
import AwesomeButton from '@components/AwesomeButton';

import ApiUtils from '@utils/ApiUtils'

type Props = {
  onNextStepPress: Function
}

class CustomerAboutYou extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }

  }

  onNextStepPress() {
    if(!this.state.feet || !this.state.inches || !this.state.weight ||
      !(this.state.preferredTrainerGender >= 0) || !this.state.birthday) {

      Actions.mainAppModal(
        {
          uniqId: new Date().getTime(),
          visible: true,
          headerText: 'Error',
          detailsText: 'Please complete all fields to finish signing up',
          onOkay:null,
          okayButtonText: 'OK',
          showCancelButton: false,
        }
      )
      return
    }
    this.props.onNextStepPress(this.state);
  }
  render(){
    return (
      <View style={styles.clientContainer}>
        <Text style={styles.headerText}>Create Your Account</Text>
        <NavigationSteps style={{marginTop:25}} currentNumber={2} numberOfSteps={3}  />
        <KeyboardAwareScrollView scrollEnabled={true} contentContainerStyle={{marginBottom:55}}>
            <Text style={[styles.headerText,{marginBottom: 30}]}>More Information</Text>
            <HorizontalLine />
            <View style={styles.nameEntryContainer}>
              <View >
                <Text style={styles.nameInputTitle}>FEET</Text>
                <TextInput style={styles.heightInput} keyboardType="numeric" placeholder='5' value={this.state.feet} autoCorrect={false} placeholderTextColor='#c0c0c0'onChangeText={(text) => this.setState({feet: text})}/>
              </View>
              <View>
                <Text style={styles.nameInputTitle}>INCHES</Text>
                <TextInput style={styles.heightInput} keyboardType="numeric" placeholder='4' value={this.state.inches} autoCorrect={false} placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({inches: text})}/>
              </View>
            </View>
            <HorizontalLine />
            <View style={styles.textInputContainer}>
              <TextInput style={styles.textInput} keyboardType="numeric" placeholder='Your weight in pounds- e.g. 150' placeholderTextColor='#c0c0c0' onChangeText={(text) => this.setState({weight: text})}/>
            </View>
            <HorizontalLine />
            <View style={styles.nameEntryContainer}>
                <DatePicker
                date={this.state.birthday}
                mode="date"
                placeholder="Your Birth Date"
                format="MM-DD-YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    height: 0
                  },
                  dateInput: {
                    borderWidth: 0,
                    alignItems: 'flex-end'
                  },
                  placeholderText: {
                    fontWeight: 'bold',
                    fontSize: 12,
                    fontFamily: 'DaytonaW01-Regular'
                  }
                }}
                onDateChange={(date) => {this.setState({birthday: date})}}
              />
            </View>

            <HorizontalLine />
            <View style={{width: 260, marginTop: 15}}>
              <Text style={styles.nameInputTitle}>Do you prefer a trainer gender?</Text>
              <SegmentedControl vals={['Male','Female','Unspecified']} color={'#5FB13D'} onChange={(event) => {this.setState({preferredTrainerGender: event.nativeEvent.selectedSegmentIndex})}} ></SegmentedControl>
            </View>
            <Text style={styles.errorText}>{this.props.error}</Text>
            <Button onPress={() => this.onNextStepPress()} buttonStyle={styles.createAccountButton} buttonTextStyle={styles.createAccountButtonText}>Complete Signup</Button>
          </KeyboardAwareScrollView>
      </View>
    )
  }
}

export default CustomerAboutYou
