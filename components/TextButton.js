import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, white } from '../utils/colors'

export default function TextButton ({ children, onPress, disabled, textColor, backgroundColor}) {
  const buttonStyles = [styles.btn]
  const buttonTextStyles = [styles.btnText]
  if (backgroundColor) {
    buttonStyles.push({ backgroundColor })
  }
  if (textColor) {
    buttonStyles.push({ borderColor: textColor })
    buttonTextStyles.push({ borderColor: textColor })
  }
  return (
    <TouchableOpacity style={buttonStyles} onPress={onPress} disabled={disabled}>
      <Text style={buttonTextStyles}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: purple,
    borderColor: white,
    borderWidth: 1,
    padding: 10,
    marginLeft: 30,
    marginRight: 30,
    height: 45,
    width: 200,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  }
})

