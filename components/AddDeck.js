import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { insertDeck } from '../actions/';
import { addNewDeck } from '../utils/api';

class AddDeck extends Component {
  state = {
    title: '',
  };

  handleTitle = title => {
    this.setState(() => ({
      title,
    }));
  };

  submitDeck = () => {
    const { title } = this.state;

    if (title) {
      addNewDeck(title);
      this.props.dispatch(insertDeck(title));
      this.props.navigation.navigate('DeckItem', { entryId: title });
      this.setState({ title: '' });
    }
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Whats is the title of your deck?</Text>
        <TextInput
          value={title}
          onChangeText={this.handleTitle}
          style={styles.input}
        />
        <Button
          onPress={this.submitDeck}
          title="Submit"
          style={styles.submit}
        />
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
    alignItems: 'center',
  },
  submit: {
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
    borderRadius: 7,
    overflow: 'hidden',
  },
});

export default connect()(AddDeck);
