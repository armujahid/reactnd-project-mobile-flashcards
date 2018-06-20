import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { StackActions } from 'react-navigation'
import TextButton from './TextButton'
import { setLocalNotification, clearLocalNotification } from '../utils/notification'
import styles from '../styles'

class Result extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
      title: `${deckTitle} Quiz Result`
    }
  }

  componentDidMount() {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  restartQuiz = () => {
    const { navigation } = this.props
    const { deckTitle, totalCards } = navigation.state.params

    navigation.navigate(
      'Quiz',
      {
        deckTitle,
        cardIndex: 0,
        totalCards,
        score: 0
      }
    )
  }

  showDeck = () => {
    const { navigation } = this.props
    const { deckTitle } = navigation.state.params

    const popAction = StackActions.pop({
      n: 1,
    });

    navigation.dispatch(popAction);
  }

  render() {
    const { score, totalCards } = this.props.navigation.state.params
    const scorePercentage = (score / (totalCards) * 100).toFixed(2)
    return (
      <View style={styles.container}>
        <Text>{score} out of {totalCards} were correct</Text>
        <Text style={styles.bottomMargin}>Score: {scorePercentage}%</Text>
        <TextButton style={{margin: 20}}
          onPress={this.restartQuiz} >
          Restart Quiz
        </TextButton>
        <TextButton style={{margin: 20}}
          onPress={this.showDeck} >
          Back to Deck
        </TextButton>
      </View>
    )
  }
}

export default Result
