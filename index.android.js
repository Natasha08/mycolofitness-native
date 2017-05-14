import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';

import {Scene, Router, Reducer, ActionConst, Modal, Actions} from 'react-native-router-flux';
import Home from './src/pages/home';
import Login from './src/components/user/login_form';
import Main from './src/pages/main';
import NavigationDrawer from './src/components/drawer';

const reducerCreate = params=>{
    const defaultReducer = Reducer(params);
    return (state, action)=>{
        // console.log("ACTION:", action);
        return defaultReducer(state, action);
    }
};

export default class MainApp extends React.Component {
  render() {
    return <Router createReducer={reducerCreate} sceneStyle={{backgroundColor:'#fff'}}>
      <Scene key="drawer" component={NavigationDrawer} open={false}>
        <Scene key="modal" component={Modal}>
          <Scene key="root">
            <Scene key="home" component={Home} title="Home"/>
            <Scene key="login" component={Login} title="Login"/>
            <Scene key="main" component={Main} title="Main"/>
          </Scene>
        </Scene>
      </Scene>
    </Router>;
  }
}

AppRegistry.registerComponent('NativeApp', () => MainApp);
