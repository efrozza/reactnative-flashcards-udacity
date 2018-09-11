import { AsyncStorage } from 'react-native'
export const CARDS_STORAGE_KEY = 'UdacityFlashCards:flashcards'

const defaultData = {
  React: {
    title: 'Blank Deck',
    questions: [
      {
        question: 'Question 1?',
        answer: 'Answer 1',
        correct: 'no'
      },
      {
        question: 'Question 2?',
        answer: 'Answer 2',
        correct: 'no'
      }
    ]
  }
}
// obtain decks
export function getDecks (deck) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY).then(results => {
    if (results === null) {
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(defaultData))
      return defaultData
    } else {
      return JSON.parse(results)
    }
  })
}

// insert a new deck with title passed in AddDeck
export function addNewDeck (title) {
  return AsyncStorage.mergeItem(
    CARDS_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: []
      }
    })
  )
}

export function addCardDeck (deckTitle, card) {
  return AsyncStorage.getItem(CARDS_STORAGE_KEY)
    .then(results => JSON.parse(results))
    .then(results => {
      results[deckTitle].questions.push(card)
      AsyncStorage.setItem(CARDS_STORAGE_KEY, JSON.stringify(results))
      return results
    })
}
