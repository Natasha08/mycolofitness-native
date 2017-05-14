import { Link, hashHistory } from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

const title = 'MyColoFitness';

export default React.createClass({

  getInitialState: function() {
    return {
      open: false
    }
  },

  handleToggle: function() {
    this.setState({open: !this.state.open});
  },

  navigatePage: function(page) {
    const navigate = hashHistory.push,
    toggleView = this.handleToggle;

    return (
      function set() {
        navigate(page);
        toggleView();
      }
    );
  },

  logout: function() {
    this.props.logout();
    this.handleToggle();
  },

  render() {
    // iconClassNameRight="muidocs-icon-navigation-expand-more"

    return (
      <div>
        <AppBar
          title={title}
          onTouchTap={this.handleToggle}
        />

        <Drawer open={this.state.open}>
          <MenuItem onClick={this.navigatePage('/home')}>Home</MenuItem>
          <MenuItem onClick={this.navigatePage('/efridge')}>E-fridge</MenuItem>
          <MenuItem onClick={this.navigatePage('/egym')}>E-gym</MenuItem>
          <MenuItem onClick={this.logout}>Logout</MenuItem>
        </Drawer>
      </div>
    );
  }
})
