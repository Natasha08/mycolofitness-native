import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import { InputField } from 'react-native-uikit'
import { LoginForm } from 'react-native-uikit'
import styles from '../../styles/style';
import AuthRepository from '../../repositories/auth';

class Login extends Component {
  componentWillMount(){ Actions.refresh({key: 'drawer', open: value => !value}); }

  onSubmit(email, password) {
    const loginParams = { email, password };

    AuthRepository.login(loginParams);
  };

  render() {
    return (
      <View style={styles.login}>
        <LoginForm
          onSubmit={this.onSubmit}
          error={false}
          errorMsg={'username or password incorrect'}
        />
      </View>
    );
  }
}
export default Login;
