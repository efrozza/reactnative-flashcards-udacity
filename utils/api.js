import { AsyncStorage } from 'react-native'
import { FLASHCARDS_STORAGE_KEY, formatCalendarResults } from './_calendar'

export function fetchDecksResults () {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(
    formatCalendarResults
  )
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(
    FLASHCARDS_STORAGE_KEY,
    JSON.stringify({
      [key]: entry
    })
  )
}

export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY).then(results => {
    const data = JSON.parse(results)
    data[key] = undefined
    delete data[key]
    AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
  })
}
