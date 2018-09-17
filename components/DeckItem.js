import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { white, gray } from '../utils/colors';

class DeckItem extends Component {
  state = {
    disableBtnQuiz: true,
  };

  componentWillMount() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;

    if (decks[deck].questions.length > 0) {
      this.setState({ disableBtnQuiz: false });
    }
  }

  render() {
    const deck = this.props.navigation.state.params.entryId;
    const { decks } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.fontTitle}>
              {decks[deck].title} - {decks[deck].questions.length} cards
            </Text>
          </View>
          <View style={styles.viewBtns}>
            <Button
              color="#32CD32"
              onPress={() =>
                this.props.navigation.navigate('AddCard', { entryId: deck })}
              title="Add Card"
            />
          </View>
          <View style={styles.viewBtns}>
            <Button
              disabled={this.state.disableBtnQuiz}
              onPress={() =>
                this.props.navigation.navigate('Quiz', { entryId: deck })}
              title="Start Quiz"
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: gray,
  },
  box: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: white,
    height: 300,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  viewBtns: {
    padding: 10,
  },
  fontTitle: {
    fontSize: 25,
  },
  boxBtn: {
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(DeckItem);
