import React, { Component } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'

class DeckItem extends Component {
  render () {
    const deck = this.props.navigation.state.params.entryId
    const { decks } = this.props

    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {decks[deck].title}
        </Text>
        <Text style={styles.text}>
          {decks[deck].questions.length} cards
        </Text>
        <Button
          onPress={() =>
            this.props.navigation.navigate('AddCard', { entryId: deck })}
          title='Add Card'
        />
        <Button
          onPress={() =>
            this.props.navigation.navigate('Quiz', { entryId: deck })}
          title='Start Quiz'
        />
      </View>
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

export default connect(mapStateToProps)(DeckItem)
