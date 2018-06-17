import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import TextButton from './TextButton'

class Result extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params
    return {
      title: `${deckTitle} Quiz Result`
    }
  }

  render() {
    const { score, totalCards } = this.props.navigation.state.params
    const scorePercentage = (score / (totalCards) * 100).toFixed(2)
    return (
      <View>
        <Text>{score} out of {totalCards} were correct</Text>
        <Text>Score: {scorePercentage}%</Text>
        <TextButton style={{margin: 20}}
          onPress={this.handleSubmit} >
          Start Quiz Again
        </TextButton>
        <TextButton style={{margin: 20}}
          onPress={this.handleSubmit} >
          Show Decks
        </TextButton>
      </View>
    )
  }
}

export default Result
