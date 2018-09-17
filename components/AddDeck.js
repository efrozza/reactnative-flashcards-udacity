import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { insertDeck } from '../actions/';
import { addNewDeck } from '../utils/api';
import { white } from '../utils/colors';

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
      <KeyboardAvoidingView behavior="padding" style={styles.container} enabled>
        <View style={{ margin: 20 }}>
          <Text style={styles.title}>Whats is the title of your deck?</Text>
          <TextInput
            value={title}
            onChangeText={this.handleTitle}
            style={styles.input}
          />
          <Button onPress={this.submitDeck} title="Add Deck" color="#32CD32" />
        </View>
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
  },
});

export default connect()(AddDeck);
