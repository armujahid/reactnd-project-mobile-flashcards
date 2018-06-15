import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';
import { white, purple } from '../utils/colors'
import Deck from './Deck'

class Decks extends PureComponent {
  render() {
    const { decks } = this.props
    return (
      <View>
        {
          Object.keys(decks).map(key => (
            <View key={key} style={[styles.item, {borderColor:purple}]}>
              <Deck deck={decks[key]}/>
            </View>
          ))
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
    justifyContent: 'center',
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: {
      width: 0,
      height: 3
    },
  }
})


function mapStateToProps (decks) {
  return {
    decks
  }
}

export default connect(
  mapStateToProps,
)(Decks)
