import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({

  getInitialState: function() {
    return {
      open: false,
    }
  },

  handleOpen: function() {
    this.setState({open: true});
  },

  handleClose: function() {
    this.setState({open: false});
  },

  render: function() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.props.submit}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Save" onClick={this.handleOpen} />
        <Dialog
          title={this.props.title}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          {this.props.prompt}
        </Dialog>
      </div>
    );
  }
})
