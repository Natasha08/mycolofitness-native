import TextField from 'material-ui/TextField';
export default React.createClass({

  getInitialState: function() {
    return {
      query: '',
      errors: '',
      checked: false
    }
  },

  resetInput: function() {
    this.setState({ value: '' });
  },

  handleChange: function(event) {
    if (!event) {
      return this.props.handleChange(this.props.title, undefined, this.state.checked);
    }
    this.props.handleChange(this.props.title, event.target.value, this.state.checked);
  },

  handleCheckBox: function(event, checked) {
    this.setState({ checked: !this.state.checked }, function() {
      this.handleChange();
    });
  },

  render: function() {
    const {hintText, floatingText, defaultValue} = this.props;
    const hideBoxShadow = {
      WebkitBoxShadow: 'none'
    };
    const style = {
      width: '60%'
    };
    const checkboxStyle = {
      width: '10%',
      alignSelf: 'flex-end',
      verticalAlign: 'bottom',
      marginLeft: '80px'
    };

    return (
      <section>
        <TextField
          hintText={hintText}
          errorText={this.props.errors}
          defaultValue={defaultValue}
          onChange={this.handleChange}
          floatingLabelText={floatingText}
          style={style}
          inputStyle={hideBoxShadow}
        />
        <TextField
          errorText={this.props.errors}
          onChange={this.handleCheckBox}
          type='checkbox'
          checked={this.state.checked}
          style={checkboxStyle}
        /><br />
      </section>
    );
  }
})
