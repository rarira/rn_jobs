import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';

import { store } from '../store';
import Swipe from '../components/Swipe';
import {
  SWIPE_RIGHT,
} from '../sagas/types';

class DeckScreen extends Component {
  static navigationOptions = {
    title: 'Jobs',
    tabBarIcon: ({ tintColor }) => <Icon name='description' size={30} color={tintColor} />,
  };

  renderCard = (job) => {
    const initialRegion = {
      longitude: job.longitude,
      latitude: job.latitude,
      latitudeDelta: 0.045,
      longitudeDelta: 0.02,
    };

    return (
      <Card title={job.jobtitle} containerStyle={{ height: 450 }}>
        <View style={{ height: 250 }}>
          <MapView
            scrollEnabled={false}
            style={{ ...StyleSheet.absoluteFillObject, }}
            cacheEnabled={Platform.OS === 'android'}
            initialRegion={initialRegion}
          >
          </MapView>
        </View>

        <View style={styles.detailWrapper}>
          <Text>{job.company}</Text>
          <Text>{job.formattedRelativeTime}</Text>
        </View>

        <Text>
          {job.snippet.replace(/<b>/g, '').replace(/<\/b/g, '')}
        </Text>
      </Card>
    );
  }

  renderNoMoreCards = () => (
    <Card title='No more jobs'>
      <Button
        title='Back To Map'
        large
        icon={{ name: 'my-location' }}
        backgroundColor='#03A9F4'
        onPress={() => this.props.navigation.navigate('map')}
      />
    </Card>
  );


  render() {
    return (
      <View style={{ marginTop: 10 }}>
        <Swipe
          data={this.props.jobs}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
          onSwipeRight={job => store.dispatch({ type: SWIPE_RIGHT, job })}
          keyProp='jobkey'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  detailWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    marginTop: 10,
  },
});

const mapStateToProps = ({ jobs }) => ({ jobs: jobs.results, });

export default connect(mapStateToProps)(DeckScreen);
