import AuthRepository from 'repositories/auth';
import xhr from 'xhr';
import store from 'store';
let title = 'Register'
import { Link, hashHistory } from 'react-router';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      agreement: ''
    }
  },

  submit: function() {
    const username = this.refs.username,
      password = this.refs.password,
      firstname = this.refs.firstname,
      email = this.refs.email;

    const errors = [];
    if (username.value == '') {
      errors.push('Please enter your username.');
    }
    if (password.value == '') {
      errors.push('Please enter your password.');
    }
    if (email.value == '') {
      errors.push('Please enter your email.');
    }
    if (firstname.value == '') {
      errors.push('Please enter your first name.');
    }
    this.setState({ errors });
    if (!errors.length) {
    this.register();
    }
  },

  register: function() {
    const username = this.refs.username.value,
    firstname = this.refs.firstname.value,
    password = this.refs.password.value,
    email = this.refs.email.value,
    loginParams = { username, password, email, firstname };

    AuthRepository.register(loginParams)
  },

  showPrivacy: function() {

  },

  checkBox: function(e) {
    this.setState({ agreement: e });
  },

  render: function() {
    return(
      <div className='wrapper'>
        <div className='form'>
          <h1>{ title }</h1>
          <section className='form-section'>
            <label className='form-label'>Email</label>
            <input className='email' ref='email' />
          </section>
          <section className='form-section'>
            <label className='form-label'>First Name</label>
            <input className='firstname' ref='firstname' />
          </section>
          <section className='form-section'>
            <label className='form-label'>Username</label>
            <input className='username' ref='username' />
          </section>
          <section className='form-section'>
            <label className='form-label'>Password</label>
            <input type='password' className='password' ref= 'password'/>
          </section>
          <section className='form-section'>
            <input type='checkbox' onChange={ this.checkBox }></input>
            <span> I have read, understand and agree to the <a href='#' onClick={ this.showPrivacy }>Privacy Agreement</a></span>
          </section>
          <section className='form-submit'>
            <button className='submit-button' onClick={ this.submit }>Register</button>
          </section>
          <section className='form-section'>
            <section className='form-errors'>{ this.state.errors }</section>
          </section>
        </div>
      </div>
    );
  }
});
