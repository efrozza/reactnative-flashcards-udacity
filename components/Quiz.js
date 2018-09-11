import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavigationsActions } from 'react-navigation';
import {
  Text,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
} from 'react-native';

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    showQuestion: false,
  };

  handleQuestion = () => {
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });
  };

  render() {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;

    return (
      <View style={styles.container}>
        <Text>
          {this.state.currentQuestion + 1} / {decks[deck].questions.length}
        </Text>
        {!this.state.showQuestion
          ? <Text>
              {decks[deck].questions[this.state.currentQuestion].question}
            </Text>
          : <Text>
              {decks[deck].questions[this.state.currentQuestion].answer}
            </Text>}
        {!this.state.showQuestion
          ? <Button title="Show Answer" onPress={this.handleQuestion} />
          : <Button title="Show Question" onPress={this.handleQuestion} />}

        <Button title="Incorrect" />
        <Button title="Correct" />
      </View>
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
  },
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Quiz);
