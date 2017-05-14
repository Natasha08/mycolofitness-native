"use strict"

import { Link, hashHistory } from "react-router";
import store from 'store';
import AuthActions from 'actions/auth';

import AppBar from 'material-ui/AppBar';
import MainNav from 'components/drawer';
import Footer from 'components/footer';
import LoginForm from 'components/user/login_form';
import Authenticate from 'components/user/authenticate';

const title = 'MyColoFitness';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      viewState: false
    }
  },
  setDisplayState: function(viewState) {
    return this.setState({ viewState: viewState });
  },

  setViewState: function() {
    switch(this.state.viewState) {
      case 'true':
        return <div>{this.props.children}</div>;

      case 'false':
        return <Authenticate setDisplayState={this.setDisplayState}/>;
    }
  },

  logout: function() {
    localStorage.removeItem('auth_token');
    store.dispatch(AuthActions(null));
    this.setDisplayState(false);
  },

  login: function() {
    return <Authenticate setDisplayState={this.setDisplayState}/>;
  },

	render: function() {
		return (
      <div>
      <MainNav logout={this.logout} />
        {this.setViewState()}
        { !! this.state.viewState ? this.props.children: this.login() }
        <Footer />
      </div>
	  );
	}
});
