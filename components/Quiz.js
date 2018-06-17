import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux';

class Quiz extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle, cardIndex, totalCards } = navigation.state.params

    return {
      title: `${deckTitle}: ${cardIndex + 1}/${totalCards}`
    }
  }

  state = {
    isCorrect: false, // flag to track whether answer is correct or incorrect
    showAnsHideQues: false
  }

  toggleView = () => {
    const { showAnsHideQues } = this.state
    this.setState({ showAnsHideQues: !showAnsHideQues });
  }

  handleCorrect = () => {
      this.setState({ isCorrect: true }, this.navigateToNextView)
  }

  navigateToNextView = () => {
    const { isLastCard, navigation } = this.props
    const { deckTitle, cardIndex, totalCards, score } = navigation.state.params
    // use isCorrect state to increment score
    const currentScore = this.state.isCorrect ? score + 1: score

    if (isLastCard){
      // navigateTo result view
      navigation.navigate(
        'Result',
        {
          deckTitle,
          totalCards,
          score: currentScore
        }
      )
    } else {
      // navigateTo next card view
      navigation.navigate(
        'Quiz',
        {
          deckTitle,
          cardIndex: cardIndex + 1,
          totalCards,
          score: currentScore
        }
      )
    }
  }

  render() {
    const { card } = this.props
    const { showAnsHideQues } = this.state

    return (
      <View>
        <TouchableOpacity onPress={this.toggleView}>
          <Text>{showAnsHideQues? card.answer: card.question}</Text>
        </TouchableOpacity>
        <TextButton style={{margin: 20}}
          onPress={this.handleCorrect} >
          Correct
        </TextButton>
        <TextButton style={{margin: 20}}
          onPress={this.navigateToNextView} >
          Incorrect
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckTitle, cardIndex, totalCards, score } = navigation.state.params
  const cards = state[deckTitle].questions;
  return {
    card: cards[cardIndex],
    isLastCard: cardIndex + 1 === totalCards,
    score
  }
}

export default connect(mapStateToProps)(Quiz)
