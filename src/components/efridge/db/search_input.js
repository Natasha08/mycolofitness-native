import TextField from 'material-ui/TextField';

export default React.createClass({

  getInitialState: function() {
    return {
      query: '',
      errors: ''
    }
  },

  render: function() {
    const {hintText, floatingText, handleChange, query} = this.props;
    const hideBoxShadow = {
      WebkitBoxShadow: 'none'
    };

    return (
      <div>
        <TextField
          hintText={hintText}
          errorText={this.state.errors}
          defaultValue={query}
          onChange={handleChange}
          floatingLabelText={floatingText}
          inputStyle={hideBoxShadow}
        /><br />
      </div>
    );
  }
})
