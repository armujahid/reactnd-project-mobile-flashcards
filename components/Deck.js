import React, { PureComponent } from 'react'
import { StyleSheet, Text, View } from 'react-native';

export default class Deck extends PureComponent {
  render() {
    const { deck } = this.props
    return (
        <View>
          <Text style={[styles.text, styles.header]}>{deck.title}</Text>
          <Text style={styles.text}>{deck.questions.length} cards</Text>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center'
  },
  header: {
    fontWeight: 'bold'
  }
})
