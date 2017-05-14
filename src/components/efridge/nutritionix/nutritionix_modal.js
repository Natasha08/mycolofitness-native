import selectedFood from 'actions/efridge';
import FoodModal from 'components/efridge/modals/food_modal';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      nutritionixFood: {}
    }
  },

  submit: function() {
    const dailyCalc = this.props.daily_calc;

    if (!dailyCalc) {
      errors.push('Please set your daily calories & macros to continue.');
      this.setState({ errors: errors });
    } else {
    }
  },

  render: function() {
    const title = 'Your selected Food';
    const nutrition_food = this.props.selected_food;
    const foodListProps = {
      exitForm: this.exitForm,
      selected_food: nutrition_food,
      submit: this.submit,
      remaining: this.props.remaining,
      daily_calc: this.props.daily_calc,
      title: 'Your selected Food',
      setFood: this.props.setFood,
      handleNutritionix: this.props.handleNutritionix,
      saveNewServing: this.props.saveNewServing
    };

    const foodList = function() {
      if (nutrition_food) {
        return <FoodModal {...foodListProps} />;
      }
      return <p>'No selected food'</p>;
    };
    return(
      foodList()
    );
  }
});
