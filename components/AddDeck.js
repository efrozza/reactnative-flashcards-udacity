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
    addNewDeck(title);
    this.props.dispatch(insertDeck(title));
    this.props.navigation.navigate('DeckItem', { entryId: title });
    this.setState({ title: '' });
  };

  render() {
    const { title } = this.state;

    return (
      <View style={styles.container}>
        <Text>Add Deck</Text>
        <Text>Deck title:</Text>
        <TextInput value={title} onChangeText={this.handleTitle} />
        <Button onPress={this.submitDeck} title="Submit" />
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
});

export default connect()(AddDeck);
