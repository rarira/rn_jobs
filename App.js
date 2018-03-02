import Expo from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { store, sagaMiddleware, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react'

import Sagas from './sagas';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

sagaMiddleware.run(Sagas);

export default class App extends React.Component {

  render() {
    const MainNavigator = TabNavigator({
      welcome: { screen: WelcomeScreen },
      auth: { screen: AuthScreen },
      main: {
        screen: TabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: {
            screen: StackNavigator({
              review: { screen: ReviewScreen },
              settings: { screen: SettingsScreen },
            }, {
              initialRouteName: 'review',
            })
          }
        },
        {
          tabBarPosition: 'bottom',
          swipeEnabled: false,
          tabBarOptions: {
            labelStyle: { fontSize: 12 },
          },
        })
      },
    },
    {
      navigationOptions: {
        tabBarVisible: false,
      },
    }
  );

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <MainNavigator />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

Expo.registerRootComponent(App);
