import { put, takeEvery } from 'redux-saga/effects'
import { receiveDecks, FETCH_DECKS, receiveDeck, ADD_DECK, receiveCard, ADD_CARD } from '../actions'
import { getDecks, getDeck, saveDeckTitle, addCardToDeck } from '../utils/api'


function* fetchDecksSaga() {
  const decks = yield getDecks()
  yield put(receiveDecks(decks))
}

function* saveDeckSaga(action) {
  // only add if deck doesn't already exist
  const deck = yield getDeck(action.title)
  if (!deck) {
    yield saveDeckTitle(action.title)
    yield put(receiveDeck(action.title))
  }
}

function* addCardSaga(action) {
  yield addCardToDeck(action.decktitle, action.card)
  yield put(receiveCard(action.decktitle, action.card))
}

// use them in parallel
export default function* rootSaga() {
    yield takeEvery(FETCH_DECKS, fetchDecksSaga)
    yield takeEvery(ADD_DECK, saveDeckSaga)
    yield takeEvery(ADD_CARD, addCardSaga)
}
