import React from 'react'
import { View } from 'react-native'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { createStore } from 'redux'
import AddDeck from './components/AddDeck'
import Decks from './components/Decks'
import DeckItem from './components/DeckItem'
import { white, purple } from './utils/colors'
import { TabNavigator, StackNavigator } from 'react-navigation'

const Tabs = TabNavigator(
  {
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'AddDeck'
      }
    },
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks'
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
