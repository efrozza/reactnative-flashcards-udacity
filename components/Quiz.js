import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { white, gray } from '../utils/colors';
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

    const totalAnswers = this.state.correctQuestions + this.incorrectQuestions;

    if (totalAnswers === this.state.currentQuestion) {
      setLocalNotification();
    }
  };

  handleRestartQuiz = () => {
    this.setState({
      currentQuestion: 0,
      showQuestion: false,
      correctQuestions: 0,
      incorrectQuestions: 0,
    });
  };

  handlebackToDeck = () => {
    this.props.navigation.dispatch(NavigationActions.back({ key: null }));
  };

  render() {
    const decks = this.props.decks;
    const deck = this.props.navigation.state.params.entryId;

    if (this.state.currentQuestion === decks[deck].questions.length) {
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={styles.viewBtns}>
              <Text style={styles.fontTitle}>You are done!</Text>
            </View>
            <View style={styles.viewBtns}>
              <Text style={styles.fontTitle}>
                Score:{this.state.correctQuestions} / Total cards:{' '}
                {decks[deck].questions.length}
              </Text>
            </View>
            <View style={styles.viewBtns}>
              <Button
                title="Restart Quiz"
                onPress={this.handleRestartQuiz}
                color="#32CD32"
              />
            </View>
            <View style={styles.viewBtns}>
              <Button title="Back to Deck" onPress={this.handlebackToDeck} />
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.box}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.fontSmall}>
                ({this.state.currentQuestion + 1} /{' '}
                {decks[deck].questions.length})
              </Text>
            </View>
            {!this.state.showQuestion
              ? <View style={{ alignItems: 'center', padding: 20 }}>
                  <Text style={styles.fontQuestion}>
                    {decks[deck].questions[this.state.currentQuestion].question}
                  </Text>
                </View>
              : <View style={{ alignItems: 'center', padding: 20 }}>
                  <Text style={styles.fontQuestion}>
                    {decks[deck].questions[this.state.currentQuestion].answer}
                  </Text>
                </View>}
            {!this.state.showQuestion
              ? <View style={styles.viewBtns}>
                  <Button title="Show Answer" onPress={this.handleQuestion} />
                </View>
              : <View style={styles.viewBtns}>
                  <Button
                    title="Show Question"
                    onPress={this.handleQuestion}
                    color="#CCCC00"
                  />
                </View>}

            <View style={styles.viewBtns}>
              <Button
                title="Incorrect"
                onPress={() => this.handleAnswer('0')}
                color="#FF0000"
              />
            </View>
            <View style={styles.viewBtns}>
              <Button
                title="Correct"
                onPress={() => this.handleAnswer('1')}
                color="#32CD32"
              />
            </View>
          </View>
        </View>
      );
    }
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
  fontSmall: {
    fontSize: 15,
  },
  fontTitle: {
    fontSize: 25,
  },
  viewBtns: {
    padding: 5,
  },
  fontQuestion: {
    fontSize: 25,
  },
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Quiz);
