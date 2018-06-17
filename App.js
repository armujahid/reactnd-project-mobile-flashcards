import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { reset, getDecks, getDeck, saveDeckTitle, addCardToDeck } from './utils/api'
import { handleInitialData, addDeck, addCard } from './actions'
import { purple, white } from './utils/colors'
import store from './store'
import Decks from './components/Decks'
import NewDeck from './components/NewDeck'
import DeckDetail from './components/DeckDetail'
import NewCard from './components/NewCard'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'

function MobiStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: Decks,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  NewDeck: {
    screen: NewDeck,
    navigationOptions: {
      tabBarLabel: 'New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = createStackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckDetail: {
    screen: DeckDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple,
      }
    }
  }
})

export default class App extends Component {
  async componentDidMount() {
    // await reset()
    // await saveDeckTitle('hellotest')
    // await addCardToDeck('hellotest', {
    //   question: 'What is React?',
    //   answer: 'A library for managing user interfaces'
    // })
    // await addCardToDeck('hellotest', {
    //   question: 'using aysnc?',
    //   answer: 'await'
    // })
    // const decks = JSON.stringify(await getDecks())
    // const decks = JSON.stringify(await getDeck('hellotest'))
    store.dispatch(addDeck('sagadeck'))
    store.dispatch(addCard('sagadeck', {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    }))
    store.dispatch(addDeck('sagadeck2'))
    store.dispatch(addCard('sagadeck2', {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    }))
    store.dispatch(addCard('sagadeck2', {
      question: 'What is React?',
      answer: 'A library for managing user interfaces'
    }))
    store.dispatch(handleInitialData())

  }

  render() {
    return (
      // <View style={styles.container}>
      //   <Text>Open up App.js to start working on your app!</Text>
      //   <Text>Changes you make will automatically reload.</Text>
      // </View>
      <Provider store={store}>
        <View style={{flex: 1}}>
          <MobiStatusBar backgroundColor={purple} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
