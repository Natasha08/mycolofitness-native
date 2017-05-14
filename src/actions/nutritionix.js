export default {
  saveSearch: function(food_search) {
    return {
      type: 'SAVE_FOOD_SEARCH',
      food_search
    }
  }
};
