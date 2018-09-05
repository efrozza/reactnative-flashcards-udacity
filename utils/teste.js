function setDummyData () {
  let data = {}
  console.log(Object.keys(data).length)
  // AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(dummyData))
  return data
}

console.log(setDummyData())

let objTeste = {
  React: {
    title: 'react',
    questions: [
      {
        question: 'React é bom?',
        answer: 'Sim'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'JavaScript',
        answer: 'Sim'
      }
    ]
  }
}

function formatCalendarResults (results) {
  return results === null ? setDummyData() : results
}

console.log(formatCalendarResults(objTeste))
