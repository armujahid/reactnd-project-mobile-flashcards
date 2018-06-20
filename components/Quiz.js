import React, { PureComponent } from 'react'
import { Text, View } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation'
import styles from '../styles'
import { white, red, green } from '../utils/colors'

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
      const resetAction = StackActions.reset({
        index: 2,
        key: null,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
          NavigationActions.navigate({ routeName: 'DeckDetail', params: { deckTitle }}),
          NavigationActions.navigate({ routeName: 'Result', params: {
              deckTitle,
              totalCards,
              score: currentScore
            }
          })
        ],
      });
      navigation.dispatch(resetAction);
    } else {
      // navigateTo next card view
      const pushAction = StackActions.push({
        routeName: 'Quiz',
        params: {
          deckTitle,
          cardIndex: cardIndex + 1,
          totalCards,
          score: currentScore
        }
      });

      navigation.dispatch(pushAction)
    }
  }

  render() {
    const { card } = this.props
    const { showAnsHideQues } = this.state

    return (
      <View style={styles.container}>
        <Text style={styles.bottomMargin}>{showAnsHideQues? card.answer: card.question}</Text>
        <TextButton style={{margin: 20}}
          onPress={this.toggleView} >
          {showAnsHideQues? 'Show Question': 'Show Answer'}
        </TextButton>
        <TextButton
          textColor={white}
          backgroundColor={green}
          onPress={this.handleCorrect} >
          Correct
        </TextButton>
        <TextButton
          textColor={white}
          backgroundColor={red}
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
