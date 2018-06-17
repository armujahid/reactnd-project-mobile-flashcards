import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import TextButton from './TextButton'
// import { addCard } from '../actions'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }
  // reset = () => {
  //   const { remove, goBack, deckId } = this.props

  //   remove()
  //   goBack()
  //   removeEntry(entryId)
  // }
  // shouldComponentUpdate (nextProps) {
  //   return nextProps.metrics !== null && !nextProps.metrics.today
  // }
  render() {
    const { deck } = this.props

    return (
      <View style={styles.container}>
        <View>
          <Text>{deck.title}</Text>
          <Text>{deck.questions.length} cards</Text>
        </View>
        <TextButton style={{margin: 20}} onPress={() => this.props.navigation.navigate(
          'NewCard',
          { deckTitle: deck.title }
        )}>
          Add Card
        </TextButton>
        <TextButton style={{margin: 20}}>
          Start Quiz
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15,
  },
})

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    deck: state[deckId],
  }
}

function mapDispatchToProps (dispatch, { navigation }) {
  // const { deckId } = navigation.state.params

  return {
    // addCard: (decktitle, card) => dispatch(addCard(decktitle, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeckDetail)
