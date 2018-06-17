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
    return (
      <View>
        <Text>{score} out of {totalCards} were correct</Text>
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
