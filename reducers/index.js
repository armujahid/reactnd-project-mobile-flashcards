import { DECKS_RECEIVED, DECK_RECEIVED, CARD_RECEIVED } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case DECKS_RECEIVED :
      return {
        ...state,
        ...action.decks,
      }
    case DECK_RECEIVED :
      return {
        ...state,
        [action.title]: {
          title : action.title,
          questions: []
        }
      }
    case CARD_RECEIVED :
      return {
        ...state,
        [action.decktitle] : {
          ...state[action.decktitle],
          questions : state[action.decktitle].questions.concat([action.card])
        }
      }
    default :
      return state
  }
}

export default decks