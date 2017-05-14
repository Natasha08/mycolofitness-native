import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from '../styles/style';
import {Actions} from 'react-native-router-flux';

class Main extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to My Fitness App!
        </Text>
        <View>
          <Text style={styles.text}>
            I logged in!
          </Text>
        </View>
      </View>
    );
  }
};

export default Main;
