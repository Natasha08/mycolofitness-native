import Snackbar from 'material-ui/Snackbar';

export default React.createClass({
  getInitialState: function() {
    return {
      autoHideDuration: 5000
    }
  },

  handleTouchTap: () => {
    this.setState({
      open: true,
    });
  },

  handleActionTouchTap: () => {
    this.props.setState();
    alert('Event removed from your calendar.');
  },

  render: function() {
    const { open, message, handleClose } = this.props;
    return (
      <div>
        <Snackbar
          open={open}
          message={message}
          action="undo"
          autoHideDuration={this.state.autoHideDuration}
          onActionTouchTap={this.handleActionTouchTap}
          onRequestClose={handleClose}
        />
      </div>
    );
  }
})
