import React, { PureComponent } from 'react'
import { View, TextInput } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux';
import { addDeck } from '../actions'
import styles from '../styles'
class NewDeck extends PureComponent {
  state = {
    title: ''
  }

  handleSubmit = () => {
    const { submitTitle, navigation } = this.props
    const { title } = this.state
    submitTitle(this.state.title)
    navigation.navigate(
      'DeckDetail',
      { deckTitle: title }
    )
    this.setState({title: ''})
  }
  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.txtInput}
          placeholder="Deck Title"
          value={title}
          onChangeText={(title) => this.setState({title})}
        />
        <TextButton
          disabled={title === ''}
          onPress={this.handleSubmit} >
          Submit
        </TextButton>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitTitle: (title) => dispatch(addDeck(title))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
