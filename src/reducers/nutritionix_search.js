export default function(state= {}, { type, food_search }) {
  if (type === 'SAVE_FOOD_SEARCH') {
    return food_search;
  }

  return state;
};
