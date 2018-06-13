import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      return {
        ...state,
        [action.title]: {
          title : action.title,
          questions: []
        }
      }
    case ADD_CARD :
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