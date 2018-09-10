import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { getDecks } from '../utils/api'

class DeckItem extends Component {
  render () {
    const deck = this.props.navigation.state.params.entryId
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <Text>
          {decks[deck].title}
        </Text>
        <Text>
          {decks[deck].questions.length}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

function mapStateToProps (decks) {
  return { decks }
}

export default connect(mapStateToProps)(DeckItem)
