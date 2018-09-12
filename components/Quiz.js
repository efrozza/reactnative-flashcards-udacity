import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { setLocalNotification } from '../utils/general';

class Quiz extends Component {
  state = {
    currentQuestion: 0,
    showQuestion: false,
    correctQuestions: 0,
    incorrectQuestions: 0,
  };

  handleQuestion = () => {
    !this.state.showQuestion
      ? this.setState({ showQuestion: true })
      : this.setState({ showQuestion: false });
  };

  handleAnswer = answer => {
    if (answer == '1') {
      this.setState({ correctQuestions: this.state.correctQuestions + 1 });
    } else {
      this.setState({ incorrectQuestions: this.state.incorrectQuestions + 1 });
    }
    this.setState({ showQuestion: false });
    this.setState({ currentQuestion: this.state.currentQuestion + 1 });
    setLocalNotification();
  };

  handleRestartQuiz = () => {
    console.log('handleRestartQuiz');
    this.setState({
      currentQuestion: 0,
      showQuestion: false,
      correctQuestions: 0,
      incorrectQuestions: 0,
    });
  };

  handlebackToDeck = () => {
    console.log('handlebackToDeck');
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;

    if (this.state.currentQuestion === decks[deck].questions.length) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            You are done! Score: {this.state.correctQuestions} / Total cards:{' '}
            {decks[deck].questions.length}
          </Text>
          <Button title="Restart Quiz" onPress={this.handleRestartQuiz} />
          <Button title="Back to Deck" onPress={this.handlebackToDeck} />
        </View>
      );
    } else {
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

          <Button title="Incorrect" onPress={() => this.handleAnswer('0')} />
          <Button title="Correct" onPress={() => this.handleAnswer('1')} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
