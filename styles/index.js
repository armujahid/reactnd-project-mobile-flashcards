
import { StyleSheet } from 'react-native';
import { purple, white } from '../utils/colors'

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  iosBtn: {
    backgroundColor: purple,
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidBtn: {
    backgroundColor: purple,
    borderColor: white,
    borderWidth: 1,
    padding: 10,
    marginLeft: 70,
    marginRight: 70,
    height: 45,
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
