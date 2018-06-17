import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import TextButton from './TextButton'
import Deck from './Deck'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }
  // reset = () => {
  //   const { remove, goBack, deckTitle } = this.props

  //   remove()
  //   goBack()
  //   removeEntry(entryId)
  // }
  // shouldComponentUpdate (nextProps) {
  //   return nextProps.metrics !== null && !nextProps.metrics.today
  // }
  startQuiz = () => {
    const { deck } = this.props
    this.props.navigation.navigate(
      'Quiz',
      {
        deckTitle: deck.title,
        cardIndex: 0,
        totalCards: deck.questions.length,
        score: 0
      }
    )
  }

  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <Deck deck={deck}/>
        <TextButton style={{margin: 20}} onPress={() => this.props.navigation.navigate(
          'NewCard',
          { deckTitle: deck.title }
        )}>
          Add Card
        </TextButton>
        <TextButton style={{margin: 20}} onPress={this.startQuiz}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckTitle } = navigation.state.params

  return {
    deckTitle,
    deck: state[deckTitle],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  // const { deckTitle } = navigation.state.params

  return {
    // addCard: (decktitle, card) => dispatch(addCard(decktitle, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)
