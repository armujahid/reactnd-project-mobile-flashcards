import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, Platform, TouchableOpacity } from 'react-native';

export default class Deck extends PureComponent {
  render() {
    const { deck } = this.props
    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} questions</Text>
      </View>
    )
  }
}
