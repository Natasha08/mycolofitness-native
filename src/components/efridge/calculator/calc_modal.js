export default React.createClass({
  submit: function(event) {
    this.props.updateCaloriesMacros();
    this.props.exitForm(event);

  },

  render: function() {
    const title = 'Your selected food';
    const { exitForm, selected_food, macrosRemaining } = this.props;
    return(
      <div className='form'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        <section className='food-card'>
          <p>If you eat this { selected_food.food_name }:</p>
          <p>calories Remaining:</p>
          { this.props.caloriesRemaining }
          <p>macros (grams) remaining:</p>
          <span>Protein: { macrosRemaining[0]+'g' } Fat: { macrosRemaining[1]+'g' } Carbs: {macrosRemaining[2]+'g' }</span>
        </section>
        <section>
          <button className='btn submit-button' onClick={ this.submit }>Submit</button>
        </section>
      </div>
    );
  }
});
