import { RECEIVE_DECKS, INSERT_DECK, INSERT_CARD } from '../actions'

function decksReducer (state = {}, action) {
  switch (action.type) {
    case INSERT_DECK:
      return {
        ...state,
        ...action.deck
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    default:
      return state
  }
}

export default decksReducer
