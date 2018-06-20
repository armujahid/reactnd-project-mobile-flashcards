import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation'
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
    const resetAction = StackActions.reset({
      index: 2,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deckTitle }}),
        NavigationActions.navigate({ routeName: 'Quiz', params: {
            deckTitle,
            cardIndex: 0,
            totalCards,
            score: 0
          }
        })
      ],
    });
    navigation.dispatch(resetAction);

    // const popAction = StackActions.pop({
    //   n: totalCards,
    // });

    // navigation.dispatch(popAction);
    // navigation.navigate(
    //   'Quiz',
    //   {
    //     deckTitle,
    //     cardIndex: 0,
    //     totalCards,
    //     score: 0
    //   }
    // )
  }

  showDeck = () => {
    const { navigation } = this.props
    const { deckTitle } = navigation.state.params

    const resetAction = StackActions.reset({
      index: 1,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deckTitle }}),
      ],
    });
    navigation.dispatch(resetAction);
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
