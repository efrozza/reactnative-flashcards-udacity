import React, { Component } from 'react';
import {
  Text,
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { insertCard } from '../actions';
import { addCardDeck } from '../utils/api';
import { white, gray } from '../utils/colors';

class AddCard extends Component {
  state = {
    question: '',
    answer: '',
  };

  handleQuestion = question => {
    this.setState(() => ({
      question,
    }));
  };

  handleAnswer = answer => {
    this.setState(() => ({
      answer,
    }));
  };

  submitCard = deck => {
    //extract params from state
    const { question, answer } = this.state;

    if (question && answer) {
      //dispatch the action sending params
      this.props.dispatch(insertCard({ question, answer, deck }));
      addCardDeck(deck, { question, answer });

      this.setState({ answer: '', question: '' });

      //back to the previous screen
      this.props.navigation.dispatch(NavigationActions.back({ key: null }));
    }
  };

  render() {
    const deck = this.props.navigation.state.params.entryId;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <Text style={styles.fontText}> Question:</Text>
        <TextInput onChangeText={this.handleQuestion} style={styles.input} />
        <Text style={styles.fontText}>Answer:</Text>
        <TextInput onChangeText={this.handleAnswer} style={styles.input} />
        <Button
          color="#32CD32"
          onPress={() => this.submitCard(deck)}
          title="Add Card"
          style={styles.submit}
        />
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
  },
  box: {
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: white,
    borderRadius: 5,
    margin: 5,
    padding: 5,
  },
  fontText: {
    fontSize: 25,
  },
  input: {
    width: 250,
    height: 35,
    padding: 7,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 12,
    borderRadius: 8,
  },
});

export default connect()(AddCard);
