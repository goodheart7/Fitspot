import {StyleSheet, Dimensions} from 'react-native'
import {DEFAULT_BACKGROUND_COLOR, DEFAULT_GREEN_COLOR} from '@theme/colors'
import {FONT_DAYTONA_LIGHT, FONT_DAYTONA_BOLD, FONT_DAYTONA_SEMIBOLD, FONT_DAYTONA_REG} from '@theme/fonts'

const styles = StyleSheet.create({

  row: {
    flex: 1,
    // flexDirection:'row',
    backgroundColor: 'rgba(255,255,255,1)',
    width: Dimensions.get('window').width - 64,
    alignSelf: 'center',
    borderRadius: 6,
    marginLeft: 25,
    marginRight: 25,
    justifyContent:'space-between'
  },
  rowTop: {
    // flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6
  },
  rowBottom: {
    // flex: 1,
    flexDirection: 'row',
  },
  bold: {
    fontFamily: FONT_DAYTONA_BOLD
  },
  rowTopTitle: {
    fontFamily: FONT_DAYTONA_SEMIBOLD,
    fontSize: 14,
    color: '#4B4B4C',
    textAlign: 'center'
  },

  rowBottomHeader: {
    color: '#4B4B4C',
    fontWeight: 'bold',
    fontSize: 8
  },
  rowBottomText: {
    color: '#4B4B4C',
    fontSize: 14,
    fontFamily: FONT_DAYTONA_REG
  },
  rowBottomColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  bestValue: {
    position: 'absolute',
    top: 33,
    left: -5
  }
})

export default styles
