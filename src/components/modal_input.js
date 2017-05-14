import TextField from 'material-ui/TextField';

export default React.createClass({

  getInitialState: function() {
    return {
      query: '',
      errors: ''
    }
  },

  resetInput: function() {
    this.setState({ value: '' });
  },

  handleChange: function(event) {
    this.props.handleChange(this.props.title, event.target.value);
  },

  render: function() {
    const {hintText, floatingText, defaultValue} = this.props;
    const hideBoxShadow = {
      WebkitBoxShadow: 'none'
    };
    return (
      <section>
        <TextField
          hintText={hintText}
          errorText={this.props.errors}
          defaultValue={defaultValue}
          onChange={this.handleChange}
          floatingLabelText={floatingText}
          inputStyle={hideBoxShadow}
        /><br />
      </section>
    );
  }
})
