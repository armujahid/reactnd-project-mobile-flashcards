import { put, takeEvery } from 'redux-saga/effects'
import { receiveDecks, FETCH_DECKS, addDeck, ADD_DECK, addCard, ADD_CARD } from '../actions'
import { getDecks, saveDeckTitle, addCardToDeck } from '../utils/api'


function* fetchDecksSaga() {
  const decks = yield getDecks()
  yield put(receiveDecks(decks))
}

function* saveDeckSaga(action) {
  yield saveDeckTitle(action.title)
  yield put(addDeck(action.title))
}

function* addCardSaga(action) {
  yield addCardToDeck(action.decktitle, action.card)
  yield put(addCard(action.decktitle, action.card))
}

// use them in parallel
export default function* rootSaga() {
    yield takeEvery(FETCH_DECKS, fetchDecksSaga)
    yield takeEvery(ADD_DECK, saveDeckSaga)
    yield takeEvery(ADD_CARD, addCardSaga)
}
