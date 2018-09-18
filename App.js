import React from 'react'
import { View, StatusBar } from 'react-native'
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
import { Constants } from 'expo'
import { setLocalNotification } from './utils/general'

function FlashCardStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

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
        tabBarLabel: 'Add Deck'
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
  componentDidMount () {
    setLocalNotification()
  }

  render () {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{ flex: 1 }}>
          <FlashCardStatusBar
            backgroundColor={purple}
            barStyle='light-content'
          />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
