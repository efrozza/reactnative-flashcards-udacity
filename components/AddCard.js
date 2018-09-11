import React, { Component } from 'react';
import {
  View,
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

    //dispatch the action sending params
    this.props.dispatch(insertCard({ question, answer, deck }));
    addCardDeck(deck, { question, answer });

    this.setState({ answer: '', question: '' });

    //back to the previous screen
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const deck = this.props.navigation.state.params.entryId;

    return (
      <KeyboardAvoidingView behaviour="padding" style={styles.container}>
        <View style={styles.container}>
          <Text>Question:</Text>
          <TextInput onChangeText={this.handleQuestion} style={styles.input} />
          <Text>Answer:</Text>
          <TextInput onChangeText={this.handleAnswer} style={styles.input} />
          <Button
            onPress={() => this.submitCard(deck)}
            title="Submit"
            style={styles.submit}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 250,
    height: 45,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    margin: 50,
    borderRadius: 8,
  },
  title: {
    fontSize: 30,
    color: '#333',
  },
  submit: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
    borderRadius: 7,
    overflow: 'hidden',
  },
});

export default connect()(AddCard);
