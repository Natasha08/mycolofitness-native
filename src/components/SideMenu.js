import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { Divider, Grid } from 'react-native-uikit'

const title = 'MyColoFitness';

export default class SideMenu extends React.Component {
  render() {
    const styles = {
      padding: 10
    };

    return (
        <View>
          <Text style={styles} title="Go to the Login page" onPress={()=>Actions.login({data:"Custom data", title:'Login' })}>Login</Text>
          <Divider color={'#eee'} />
          <Text style={styles} title="Go to the Home page" onPress={()=>Actions.home()}>Go Home</Text>
          <Divider color={'#eee'} />
          <Text style={styles} title="Go to the Main page" onPress={()=>Actions.main()}>Main Page</Text>
          <Divider color={'#eee'} />
        </View>
    );
  }
}
