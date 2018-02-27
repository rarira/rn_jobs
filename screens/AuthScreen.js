import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import store from '../store';
import { FACEBOOK_LOGIN } from '../sagas/types';

class AuthScreen extends Component {
  componentDidMount() {
    store.dispatch({ type: FACEBOOK_LOGIN });
  }

  render() {
    return (
      <View>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
        <Text>AuthScreen</Text>
      </View>
    );
  }
}

export default connect(null)(AuthScreen);
