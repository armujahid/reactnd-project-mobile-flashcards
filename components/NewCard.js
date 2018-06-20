import React, { PureComponent } from 'react'
import { View, TextInput } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux';
import { addCard } from '../actions'
import styles from '../styles'
class NewDeck extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    const { deckTitle } = navigation.state.params

    return {
      title: `Add Card in ${deckTitle}`
    }
  }

  state = {
    question: '',
    answer: ''
  }

  handleSubmit = () => {
    const { addCard, goBack, deckTitle } = this.props
    const { question, answer } = this.state
    addCard(deckTitle, {
      question,
      answer
    })
    this.setState({question: '', answer: ''})
    goBack()
  }
  render() {
    const { question, answer } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          placeholder="Enter Question here"
          value={question}
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={styles.txtInput}
          placeholder="Enter Answer here"
          value={answer}
          onChangeText={(answer) => this.setState({answer})}
        />
        <TextButton
          disabled={question === '' || answer === ''}
          onPress={this.handleSubmit} >
          Submit
        </TextButton>
      </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckTitle } = navigation.state.params

  return {
    deckTitle,
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
