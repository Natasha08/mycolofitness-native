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
  onSubmit(email, password) {
    console.log(email, password);
    const loginParams = { email, password };
    console.log("WHAT THE DUCE", JSON.stringify(loginParams))
    AuthRepository.login(loginParams)
//
  };

  render() {
    const state = this.state;

    return (
      <View style={styles.login}>
        <LoginForm
          loginFb={() => console.log('login with facebook')}
          onSubmit={this.onSubmit}
          error={false}
          errorMsg={'username or password incorrect'}
        />
      </View>
    );
  }
}
export default Login;
// import Register from 'components/user/register_form';
// import xhr from 'xhr';
// import store from 'store';
// let title = 'Login'
// import { Link, hashHistory } from 'react-router';

// export default React.createClass({
//   getInitialState: function() {
//     return {
//       errors: [],
//       agreement: ''
//     }
//   },

//   submit: function() {
//     let username = this.refs.username;
//     let password = this.refs.password;

//     let errors = [];
//     if (username.value == '') {
//       errors.push('Please enter your username.');
//     }
//     if (password.value == '') {
//       errors.push('Please enter your password.');
//     }
//     this.setState({ errors });
//     if (!errors.length) {
//     this.login();
//     }
//   },

//   login: function() {
//     const username = this.refs.username.value;
//     const password = this.refs.password.value;
//     const loginParams = { username, password };

//     AuthRepository.login(loginParams)
//   },

//   openRegistration: function() {
//     return hashHistory.push('/register');
//   },

//   showPrivacy: function() {

//   },

//   checkBox: function(event) {
//     this.setState({ agreement: event.target.value });
//   },

//   render: function() {
//     return(
//       <div className='flex-column'>
//         <div className='form'>
//           <h1>{ title }</h1>
//           <section className='form-section'>
//             <label className='form-label'>Username</label>
//             <input className='username' ref='username' />
//           </section>
//           <section className='form-section'>
//             <label className='form-label'>Password</label>
//             <input type='password' className='password' ref= 'password' />
//           </section>
//           <section className='form-section'>
//             <button className='submit-button' onClick={ this.openRegistration }>Register</button>
//             <input type='checkbox' ref='checkbox' onClick={ this.checkBox }></input>
//             <span> I have read, understand and agree to the <a href='#' onClick={ this.showPrivacy }>Privacy Agreement</a></span>
//           </section>
//           <section className='form-submit'>
//             <button className='submit-button' onClick={ this.submit }>Login</button>
//           </section>
//           <section className='form-section'>
//             <section className='form-errors'>{ this.state.errors }</section>
//           </section>
//         </div>
//       </div>
//     );
//   }
// });
