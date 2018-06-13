// reducer actions
export const DECKS_RECEIVED = 'DECKS_RECEIVED'
export const DECK_RECEIVED = 'DECK_RECEIVED'
export const CARD_RECEIVED = 'CARD_RECEIVED'
// saga actions
export const FETCH_DECKS = 'FETCH_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'

export function handleInitialData () {
  return { type: FETCH_DECKS }
}

export function receiveDecks (decks) {
  return {
    type: DECKS_RECEIVED,
    decks,
  }
}

export function addDeck (title) {
  return {
    type: DECK_RECEIVED,
    title,
  }
}

export function addCard (decktitle, card) {
  return {
    type: CARD_RECEIVED,
    decktitle,
    card,
  }
}