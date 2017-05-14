export default {
  fetch: function(food_items) {
    return {
      type: 'FETCH_FOOD_ITEMS',
      food_items
    }
  },
  fetchDailyCalc: function(daily_calc) {
    return {
      type: 'FETCH_DAILY_CALC',
      daily_calc
    }
  },
  remainingCal: function(remaining_cal) {
    return {
      type: 'POST_REMAINING_CAL',
      remaining_cal
    }
  },
  remainingMacro: function(remaining_macro) {
    return {
      type: 'POST_REMAINING_MACRO',
      remaining_macro
    }
  },
  fetchCurrentCalc: function(current_calc) {
    return {
      type: 'FETCH_CURRENT_CALC',
      current_calc
    }
  },
  set: function(foodItem){
    return {
      type: 'SELECTED_FOOD',
      foodItem
    }
  }
};
