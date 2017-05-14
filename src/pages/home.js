import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from '../styles/style';
import {Actions} from 'react-native-router-flux';

class Home extends Component {
componentWillMount(){ Actions.refresh({key: 'drawer', open: value => !value}); }

  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to My Fitness App!
        </Text>
      </View>
    );
  }
};

export default Home;
