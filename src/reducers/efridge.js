export default function(state= {}, { type, food_items }) {
  if (type === 'FETCH_FOOD_ITEMS') {
    return food_items;
  }

  return state;
};
