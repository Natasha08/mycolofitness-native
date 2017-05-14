export default React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },

  submit: function(event) {
    const totalCalc = {
      total_daily_calories: this.refs.total_calories.value,
      protein_macro: this.refs.protein_macro.value,
      fat_macro: this.refs.fat_macro.value,
      carbs_macro: this.refs.carbs_macro.value,
      date: this.refs.date.value
     };
     this.props.postCalc({ totalCalc })
     this.props.exitForm(event);
  },

  render: function() {
    const title = 'Your Daily Calculator';
    const { exitForm } = this.props;
    return(
      <div className='form'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        <section className='food-card'>
          <input type='date' ref='date' />
          <label className='food-label'>Date</label>
        </section>
        <section className='food-card'>
          <input type='number' ref='total_calories' />
          <label className='food-label'>Total Calories</label>
        </section>
        <section className='food-card'>
          <label className='food-label'>Macro Ratio:</label>
        </section>
        <section className='food-card'>
          <input type='number' ref='protein_macro' />
          <label className='food-label'>Protein</label>
        </section>
        <section className='food-card'>
          <input type='number' ref='fat_macro' />
          <label className='food-label'>Fat</label>
        </section>
        <section className='food-card'>
          <input type='number' ref='carbs_macro' />
          <label className='food-label'>Carbohydrate</label>
        </section>
        <section className='food-card'>
          <button className='btn submit-button' onClick={ this.submit }>Submit</button>
        </section>
      </div>
    );
  }
});
