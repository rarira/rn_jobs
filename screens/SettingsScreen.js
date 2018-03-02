import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import store from '../store';

import { CLEAR_LIKED } from '../sagas/types';

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Settings',
    tabBarLabel: 'Review Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name='favorite' size={30} color={tintColor} />,
  };

  render() {
    return (
      <View>
        <Button
          title="Reset Liked Jobs"
          large
          icon={{ name: 'delete-forever' }}
          backgroundColor='#F44336'
          onPress={() => store.dispatch({ type: CLEAR_LIKED })}
        />
      </View>
    );
  }
}

export default connect(null)(SettingsScreen);
