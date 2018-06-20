import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white, purple } from '../utils/colors'
import TextButton from './TextButton'
import Deck from './Deck'
import styles from '../styles'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: deckTitle
    }
  }

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
        <TextButton
          textColor={purple}
          backgroundColor={white}
          onPress={() => this.props.navigation.navigate(
          'NewCard',
          { deckTitle: deck.title }
        )}>
          Add Card
        </TextButton>
        <TextButton
          disabled={deck.questions.length === 0}
          onPress={this.startQuiz}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

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
