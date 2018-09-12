import React, { Component } from 'react'
import { View, ScrollView, Text, StyleSheet, Button } from 'react-native'
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
      <ScrollView>
        {Object.keys(decks).map(deck => {
          // extract vars from apiData
          const { title, questions } = decks[deck]

          return (
            <View key={deck}>
              <Text style={styles.text}>
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
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    color: '#333',
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
