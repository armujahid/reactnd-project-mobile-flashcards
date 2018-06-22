import React, { PureComponent } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
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
    const resetAction = StackActions.reset({
      index: 1,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'Home' }),
        NavigationActions.navigate({ routeName: 'DeckDetail', params: { deckTitle: title }})
      ],
    });
    navigation.dispatch(resetAction);
    this.setState({title: ''})
  }
  render() {
    const { title } = this.state

    return (
      <KeyboardAvoidingView style={styles.container}>
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
      </KeyboardAvoidingView>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitTitle: (title) => dispatch(addDeck(title))
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
