import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default class Deck extends PureComponent {
  render() {
    const { deck, style } = this.props
    const noOfCards = deck.questions.length
    return (
        <View style={style}>
          <Text style={[styles.text, styles.header]}>{deck.title}</Text>
          <Text style={styles.text}>{noOfCards} {noOfCards === 1? 'card' : 'cards'}</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 22
  },
  header: {
    fontWeight: 'bold'
  }
})
