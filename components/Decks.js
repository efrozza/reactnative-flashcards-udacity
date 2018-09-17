import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import { white, gray } from '../utils/colors'

class Decks extends Component {
  componentDidMount () {
    getDecks().then(decks => this.props.receiveAllDecks(decks))
  }

  render () {
    const { decks } = this.props

    return Object.keys(decks).length > 0
      ? <View style={styles.container}>
        {Object.keys(decks).map(deck => {
          const { title, questions } = decks[deck]
          return (
            <View key={deck} style={styles.box}>
              <TouchableOpacity
                onPress={() =>
                    this.props.navigation.navigate('DeckItem', {
                      entryId: deck
                    })}
                >
                <Text style={styles.fontText}>
                  {title} ({questions.length})
                  </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      </View>
      : <View style={styles.container}>
        <Text style={styles.fontTitle}>
            There aren´t decks in your database!
          </Text>
      </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: gray
  },
  headerView: {
    backgroundColor: '#f8f8f8'
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    backgroundColor: white,
    borderRadius: 5,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  fontTitle: {
    fontSize: 30,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  fontText: {
    fontSize: 25
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
