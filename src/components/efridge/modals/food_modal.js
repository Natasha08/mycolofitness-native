export default React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },

  submit: function() {
    const dailyCalc = this.props.daily_calc;
    const errors = [];
    if (!dailyCalc) {
      errors.push('Please set your daily calories & macros to continue.');
      this.setState({ errors: errors });
    } else {
      this.props.remaining();
      this.props.exitForm;
    }

  },

  recalculateServing: function(e) {
    const newServing = this.refs.current_serving.value;

    this.props.saveNewServing(newServing);
  },

  render: function() {
    const title = 'Your selected Food';
    const { selected_food, exitForm, remaining, saveNewServing } = this.props;
    return(
      <div className='form flex-column'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        <section className='form-section'>
          <input className='food_name' onChange={this.recalculateServing} type='text' ref='current_serving' />
          <label className='form-label'>Serving Size</label>
        </section>
        <section className='food-card'>
          <label className='food-label'>Name of Food</label>
          <p>{ selected_food.food_name }</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>Brand</label>
          <p>{ selected_food.brand }</p>
        </section>
        <section className='food-card'>
          <label ref='target_serving' className='food-label'>Serving Size</label>
          <p>{ selected_food.serving_size + ' ' + selected_food.serving_size_unit }</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>Total Calories</label>
          <p>{ selected_food.total_calories * selected_food.serving_size }cal</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>Carbohydrates</label>
          <p>{ selected_food.carbohydrate_grams * selected_food.serving_size }g</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>Fat</label>
          <p>{ selected_food.fat_grams * selected_food.serving_size }g</p>
        </section>
        <section className='food-card'>
          <label className='food-label'>Protein</label>
          <p>{ selected_food.protein_grams * selected_food.serving_size }g</p>
        </section>
        <section className='food-card'>
          <button className='btn submit-button' onClick={ this.submit }>Calculate remaining</button>
        </section>
        <section className='form-section'>
          <section className='form-errors'>{ this.state.errors }</section>
        </section>
      </div>
    );
  }
});
