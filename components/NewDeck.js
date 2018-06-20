import React, { PureComponent } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native';
import TextButton from './TextButton'
import { connect } from 'react-redux';
import { addDeck } from '../actions'
import styles from '../styles'
class NewDeck extends PureComponent {
  state = {
    title: ''
  }

  handleSubmit = () => {
    const { submitTitle, goBack } = this.props
    submitTitle(this.state.title)
    this.setState({title: ''})
    goBack()
  }
  render() {
    const { title } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 250}}
          placeholder="Deck Title"
          value={title}
          onChangeText={(title) => this.setState({title})}
        />
        <TextButton style={{margin: 20}}
          disabled={title === ''}
          onPress={this.handleSubmit} >
          Submit
        </TextButton>
      </View>
    )
  }
}

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    submitTitle: (title) => dispatch(addDeck(title)),
    goBack: () => navigation.goBack(),
  }
}

export default connect(null, mapDispatchToProps)(NewDeck)
