import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import DeckItem from './components/DeckItem'
import Quiz from './components/Quiz'
import { white, purple } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks'
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'AddDeck'
      }
    }
  },
  {
    navigationOptions: {
      header: null
    }
  }
)

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckItem: {
    screen: DeckItem,
    navigationOptions: {
      title: 'Deck Item',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Cards',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

export default class App extends React.Component {
  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <View style={{ height: 20 }} />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
