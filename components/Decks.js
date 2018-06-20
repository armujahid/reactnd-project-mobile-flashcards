import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, FlatList, View, Text, Platform, TouchableOpacity } from 'react-native';
import { white } from '../utils/colors'
import Deck from './Deck'
import globalStyles from '../styles'

class Decks extends PureComponent {

  handleDeckPress = (deck) => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deckTitle: deck.title }
    )
  }

  renderDeck = ({ item }) => (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => this.handleDeckPress(item)}>
        <Deck deck={item}/>
      </TouchableOpacity>
    </View>
  )

  render() {
    const { decks } = this.props
    const flatDecks = Object.keys(decks).map(key => decks[key])
    if (flatDecks.length == 0) {
      return (
        <View style={globalStyles.container}>
          <Text>Please create a Deck!</Text>
        </View>
      )
    }
    return (
      <View>
        {
          <FlatList
              data={flatDecks}
              renderItem={this.renderDeck}
              keyExtractor={(item) => item.title}
          />
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
