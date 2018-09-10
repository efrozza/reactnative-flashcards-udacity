export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const INSERT_DECK = 'INSERT_DECK'
export const INSERT_CARD = 'INSERT_CARD'

export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  }
}

export function insertDeck (deck) {
  return {
    type: INSERT_DECK,
    deck
  }
}

export function insertCard (card) {
  return {
    type: INSERT_CARD,
    card
  }
}
