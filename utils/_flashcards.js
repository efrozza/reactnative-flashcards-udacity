import { AsyncStorage } from 'react-native'
export const FLASHCARDS_STORAGE_KEY = 'flashcards:data'

function setDummyData () {
  let data = {}
  AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  return data
}

function formatCalendarResults (results) {
  return results === null ? setDummyData() : results
}

console.log(formatCalendarResults(objTeste))
