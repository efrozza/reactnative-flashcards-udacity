import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'

class Decks extends Component {
  componentDidMount () {
    getDecks().then(decks => this.props.receiveAllDecks(decks))
  }

  render () {
    const { decks } = this.props
    return (
      <View style={styles.container}>
        {Object.keys(decks).map(deck => {
          // extract vars from apiData
          const { title, questions } = decks[deck]

          return (
            <View key={deck}>
              <Text>
                {title} / {questions.length}
              </Text>
              <Button
                onPress={() =>
                  this.props.navigation.navigate('DeckItem', { entryId: deck })}
                title='View deck'
              />
            </View>
          )
        })}
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

function mapDispatchToProps (dispatch) {
  return {
    receiveAllDecks: decks => dispatch(receiveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Decks)
