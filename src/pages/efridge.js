import { Link } from 'react-router';

import SnackBar from 'components/snack_bar';

import FoodModal from 'components/efridge/modals/food_modal';
import FoodForm from 'components/efridge/modals/efridge_form';

import NutritionixModal from 'components/efridge/nutritionix/nutritionix_modal';
import NutritionixSearch from 'components/efridge/nutritionix/nutritionix_search';

import DbSearch from 'components/efridge/db/db_search';
import Nav from 'components/efridge/nav';

import CalcModal from 'components/efridge/calculator/calc_modal';
import CurrentCalc from 'components/efridge/calculator/current_calc';
import DailyCalc from 'components/efridge/calculator/daily_calc';

const title = 'Your E-fridge';

export default React.createClass({

  getInitialState: function() {
    return {
      calories_remaining: 0,
      confirmModalProps: null,
      errors: [],
      item: null,
      macrosRemaining: 0,
      nutritionixFood: '',
      nutritionixSearch: '',
      selectedFood: '',
      viewDisplay: '',
      snackBar: false,
      snackBarMessage: ''
    }
  },

  componentDidMount: function() {
     this.setState(this.getInitialState(), function() {
       console.log("UPDATED PAGE");
     });
  },

  setDisplayName: function(viewDisplay) {
    return(event) => {
      this.setState({ viewDisplay: viewDisplay });
    }
  },

  openSnackBar: function(message, exitFunc) {
    this.setState({ snackBarMessage: message, snackBar: true }, exitFunc(event));
  },

  closeSnackBar: function() {
    this.setState({ snackBar: false });
  },

  exitForm: function(event) {
    event.preventDefault();
    this.setState({ viewDisplay: '' , item: null}, function() {
    });
  },

  handleNutritionix: function(food) {
    this.setState({ nutritionixFood: food }, function() {
      this.calculateRemaining();
    });
  },

  openFood: function(viewDisplay) {
    this.setState({ viewDisplay: viewDisplay });

  },

  setNutritionixFood: function(food, type) {
    if (type === 'search') {
      this.setState({ nutritionixSearch: food }, function() {
        console.log("NEW SEARCH SET");
      });
    }
    if (type === 'food') {
      this.setState({ nutritionixFood: food }, function() {
        console.log("NEW FOOD SET");
      });
    }
  },

  calculateRemaining: function() {
    this.calculateCaloriesRemaining();

  },

  calculateCaloriesRemaining: function() {

    const dailyCalc = this.props.daily_calc,
      selectedFood = this.props.selected_food_item,
      currentCalMacros = this.props.current_calc[0];
    if (!currentCalMacros) {
      const caloriesRemaining = dailyCalc.total_daily_calories - (selectedFood.total_calories * Number(selectedFood.serving_size));
      this.setCaloriesRemaining(caloriesRemaining, function() {
        console.log("CAL REM", caloriesRemaining);
      });

    } else {
      const calRemaining = currentCalMacros.remaining - (selectedFood.total_calories * Number(selectedFood.serving_size));
      this.setCaloriesRemaining(calRemaining);
    }
    this.calculateMacrosRemaining();

  },

  calculateMacrosRemaining: function() {
    if (this.props.daily_calc) {
    const currentCalMacros = this.props.current_calc[0];
    const dailyCalc = this.props.daily_calc,
      selectedFood = this.props.selected_food_item,
      totalProtein = ((dailyCalc.protein_macro / 100)*dailyCalc.total_daily_calories)/4,
      totalFat = ((dailyCalc.fat_macro / 100)*dailyCalc.total_daily_calories)/9,
      totalCarbs = ((dailyCalc.carbs_macro / 100)*dailyCalc.total_daily_calories)/4;

    if (!currentCalMacros) {

      const remainingProtein = Math.round((totalProtein - (selectedFood.protein_grams * Number(selectedFood.serving_size)))),
        remainingFat = Math.round((totalFat - (selectedFood.fat_grams * Number(selectedFood.serving_size)))),
        remainingCarbs = Math.round((totalCarbs - (selectedFood.carbohydrate_grams * Number(selectedFood.serving_size))));

      const macrosRemaining = [remainingProtein, remainingFat, remainingCarbs];

      this.setMacrosRemaining(macrosRemaining);
    } else {
      const currentCalc = this.props.current_calc[0];

      const remainingProtein = Math.round((currentCalc.remaining_protein - (selectedFood.protein_grams * Number(selectedFood.serving_size)))),
        remainingFat = Math.round((currentCalc.remaining_fat - (selectedFood.fat_grams * Number(selectedFood.serving_size)))),
        remainingCarbs = Math.round((currentCalc.remaining_carb - (selectedFood.carbohydrate_grams * Number(selectedFood.serving_size))));

      const macrosRemaining = [remainingProtein, remainingFat, remainingCarbs];

      this.setMacrosRemaining(macrosRemaining);
    }
   }
   this.setState({ viewDisplay: 'calcModal' }, function() {
     console.log("REMAINING HAS BEEN CALCULATED", this.state.calories_remaining);
   });

 },

  setCaloriesRemaining: function(caloriesObj) {
    this.setState({ calories_remaining: caloriesObj });
  },

  setMacrosRemaining: function(macroObj) {
    this.setState({ macrosRemaining: macroObj });
  },

  updateCaloriesMacros: function() {
    const caloriesRemaining = this.state.calories_remaining,
      macrosRemaining = this.state.macrosRemaining,
      currentCalMacros = this.props.current_calc[0];

      if (!currentCalMacros) {
        const consumed = this.props.selected_food_item.total_calories * Number(this.props.selected_food_item.serving_size);

        const currentCalc = {
          remaining: caloriesRemaining,
          consumed: consumed,
          remaining_protein: macrosRemaining[0],
          remaining_fat: macrosRemaining[1],
          remaining_carb: macrosRemaining[2]
        };

        this.props.postCurrentCalc({currentCalc})
      } else {

        const updateConsumed = (Number(currentCalMacros.consumed) + Number(this.props.selected_food_item.total_calories)) * Number(this.props.selected_food_item.serving_size);
        const updatedCalc = {
          consumed: updateConsumed,
          remaining: caloriesRemaining,
          remaining_protein: macrosRemaining[0],
          remaining_fat: macrosRemaining[1],
          remaining_carb: macrosRemaining[2]
        };

        this.props.updateCurrentCalc({updatedCalc})

      }

  },

  adjustServing: function(newServing) {
    const changedFood = this.props.selected_food_item;
     if (changedFood.fields) {
       changedFood.fields.serving_size_qty = newServing;
       this.props.saveNewServing(changedFood);
       this.openFood('nutritionixModal');
     } else {
       changedFood.serving_size = newServing;
       this.props.saveNewServing(changedFood);
       this.openFood('foodModal');
     }
  },

  setView: function() {
    switch(this.state.viewDisplay) {
      case '':
      return;
      case 'newFood':
        const foodFormProps = {
          saveFood: this.props.saveFood,
          title: title,
          confirm: this.setConfirmModalProps,
          confirmProps: this.state.confirmModalProps,
          setDisplayName: this.setDisplayName,
          exit: this.exitForm,
          open: this.state.snackBar,
          openSnackBar: this.openSnackBar,
          closeSnackBar: this.closeSnackBar
        };
        return <FoodForm {...foodFormProps}/>;
      case 'foodModal':
        const foodModalProps = {
          remaining: this.calculateRemaining,
          selected_food: this.props.selected_food_item,
          exitForm: this.exitForm,
          daily_calc: this.props.daily_calc,
          saveNewServing: this.adjustServing
        };
        return <FoodModal {...foodModalProps}/>;

      case 'setDaily':
        return <DailyCalc exitForm={this.exitForm} postCalc={this.props.postCalc}/>;

      case 'calcModal':
        const calcModalProps = {
          exitForm: this.exitForm,
          selected_food: this.props.selected_food_item,
          caloriesRemaining: this.state.calories_remaining,
          macrosRemaining: this.state.macrosRemaining,
          updateCaloriesMacros: this.updateCaloriesMacros
        };
        return <CalcModal {...calcModalProps} />;
      case 'currentCalcModal':
        const currentCalcPresent = this.props.current_calc ? this.props.calc: 'no current calc';

        const currentCalcModalProps = {
          exitForm: this.exitForm,
          current_calc: this.props.current_calc,
          deleteCurrentCalc: this.props.deleteCurrentCalc,
          daily_calc: this.props.daily_calc,
          selected_food: this.props.selected_food_item
        };

        return <CurrentCalc {...currentCalcModalProps} />;
      case 'nutritionixModal':
        const modalProps = {
          handleNutritionix: this.handleNutritionix,
          selected_food: this.props.selected_food_item,
          exitForm: this.exitForm,
          daily_calc: this.props.daily_calc,
          setFood: this.setNutritionixFood,
          handleNutritionix: this.handleNutritionix,
          saveNewServing: this.adjustServing,
          remaining: this.calculateRemaining

        };
        return <NutritionixModal {...modalProps}/>;
    }
  },

  render: function(props) {
    const foodItems = this.props.food_items,
    currentDailyCalc = this.props.daily_calc,
    dbSearchProps = {
      setDisplayName: this.setDisplayName,
      foodItems: foodItems,
      openFood: this.openFood,
      exit: this.exitForm,
      deleteFood: this.props.deleteFood,
      open: this.state.snackBar,
      openSnackBar: this.openSnackBar,
      closeSnackBar: this.closeSnackBar
    };

    const NutritionixSearchProps = {
      openFood: this.openFood,
      setFood: this.setNutritionixFood,
      handleNutritionix: this.handleNutritionix,
      foodSearch: this.props.food_search
    };

    const snackBarProps = {
      open: this.state.snackBar,
      message: this.state.snackBarMessage,
      handleClose: this.closeSnackBar
    };

    return(
      <div className='efridge-main'>
        { !! this.currentDailyCalc ? 'Set your daily limits to track nutrients': null }
        <Nav className='nav' displayName = {this.setDisplayName} />
        { this.setView() }
        <NutritionixSearch className='nutritionix-search' {...NutritionixSearchProps} />
        <DbSearch className='db-search' {...dbSearchProps}/>
        <SnackBar {...snackBarProps}/>
      </div>
    );
  }
});
