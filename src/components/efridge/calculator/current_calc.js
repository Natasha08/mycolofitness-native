export default React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },

  reset: function(event) {
      this.props.deleteCurrentCalc();
      this.props.exitForm(event);
  },

  calculateMacros: function() {
    const dailyCalc = this.props.daily_calc;

    if (dailyCalc) {
      const totalProtein = Math.round(((dailyCalc.protein_macro / 100)*dailyCalc.total_daily_calories)/4),
        totalFat = Math.round(((dailyCalc.fat_macro / 100)*dailyCalc.total_daily_calories)/9),
        totalCarbs = Math.round(((dailyCalc.carbs_macro / 100)*dailyCalc.total_daily_calories)/4);

      const macrosRemaining = [totalProtein, totalFat, totalCarbs];

      return this.dailyCalc(macrosRemaining);
   }

 },

  currentCalc: function() {
    const current_calc = this.props.current_calc;
    return (
      <div>
        <section className='food-card'>
          <label className='food-label'>You have eaten: </label>
          <p>{ current_calc[0].consumed + ' calories'}</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>You have: </label>
          <p>{ current_calc[0].remaining + ' calories remaining'}</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>You have: </label>
          <p>Protein: { current_calc[0].remaining_protein + 'g'} Fat: { current_calc[0].remaining_fat + 'g'} Carbs: { current_calc[0].remaining_carb + 'g'}</p>
        </section>
        <section className='food-card'>
          <button className='submit-button' onClick={ this.reset }>Reset</button>
        </section>
      </div>
    )
  },

  dailyCalc: function(macrosRemaining) {
    const daily_calc = this.props.daily_calc;
    const errors = [];

    if (!daily_calc.total_daily_calories) {
      return <div className='form-errors'>Please set your daily calories and macros first</div>;
    }

    return (
      <div>
        <section className='food-card'>
          <label className='food-label'>You have eaten: </label>
          <p> 0 calories</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>You have: </label>
          <p>{ daily_calc.total_daily_calories + ' calories remaining'}</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>You have: </label>
          <span>Protein: { macrosRemaining[0]+'g' } Fat: { macrosRemaining[1]+'g' } Carbs: {macrosRemaining[2]+'g' }</span>
        </section>
      </div>
    )
  },

  render: function() {
    const title = 'Calories and macros remaining';
    const { current_calc, exitForm } = this.props;
    return(
      <div className='form'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        { !! current_calc.length ? this.currentCalc() : this.calculateMacros() }

        <section className='form-section'>
          <section className='form-errors'>{ this.state.errors }</section>
        </section>
      </div>
    );
  }
});
