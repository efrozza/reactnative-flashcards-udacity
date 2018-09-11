import { RECEIVE_DECKS, INSERT_DECK, INSERT_CARD } from '../actions'

function decksReducer (state = {}, action) {
  switch (action.type) {
    case INSERT_DECK:
      const insertedDeck = {
        [action.deck]: {
          title: action.deck,
          questions: []
        }
      }
      return {
        ...state,
        ...insertedDeck
      }
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }
    case INSERT_CARD:
      const { question, answer, deck, correct } = action.card
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [...state[deck].questions, { question, answer, correct }]
        }
      }
    default:
      return state
  }
}

export default decksReducer
