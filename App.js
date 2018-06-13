import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { reset, getDecks, getDeck, saveDeckTitle, addCardToDeck } from './utils/api'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { addDeck } from './actions'

const store = createStore(reducer, middleware)

export default class App extends React.Component {
  state = {
    decks: 'hello'
  }

  async componentDidMount() {   
    // await reset()
    await saveDeckTitle('hellotest')
    await addCardToDeck('hellotest', {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    })
    await addCardToDeck('hellotest', {
      question: 'using aysnc?',
      answer: 'await'
    })
    const decks = JSON.stringify(await getDecks())
    // const decks = JSON.stringify(await getDeck('hellotest'))

    this.setState({decks})
  }
  
  render() {
    const { decks } = this.state
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>{decks}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
