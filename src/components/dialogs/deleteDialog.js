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
        label="Delete"
        primary={true}
        onClick={this.props.delete(this.props.items, this.handleClose)}
      />,
    ];

    return (
      <div>
        <i key={this.props.items.id} className="fa fa-trash-o" onClick={this.handleOpen}></i>

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
