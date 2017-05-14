import store from 'store';
import LoginForm from 'components/user/login_form';
import Register from 'components/user/register_form';

export default React.createClass({
  loggedIn: function() {
    var loginCheck = !! _.get(store.getState(), 'auth.token');
    if (loginCheck) {
      this.props.setDisplayState(loginCheck);
    }
    return loginCheck;
  },

  render: function() {
    return this.loggedIn() ? <div>Logged In</div> : <LoginForm />;
  }
});
