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

  render: function() {
    const {hintText, floatingText, handleChange} = this.props;
    const hideBoxShadow = {
      WebkitBoxShadow: 'none'
    };

    return (
      <section>
        <TextField
          hintText={hintText}
          errorText={this.state.errors}
          defaultValue={this.state.query}
          onChange={handleChange}
          floatingLabelText={floatingText}
          inputStyle={hideBoxShadow}
        /><br />
      </section>
    );
  }
})
