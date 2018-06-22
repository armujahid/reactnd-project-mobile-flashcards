import { AsyncStorage } from 'react-native'
const DECKS_STORAGE_KEY = 'armflashcards:decks'


export function reset () {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

export function getDecks () {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(JSON.parse)
}

export function getDeck (title) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      return data[title]
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function initDeck () {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }))
}




export function addCardToDeck (title, card) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      const deck = data[title]
      deck.questions = deck.questions.concat([card])
      return AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}
