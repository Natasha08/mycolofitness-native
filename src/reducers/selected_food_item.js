export default function(state= {}, { type, foodItem }) {

  if (type === 'SELECTED_FOOD') {
    return foodItem;
  }
  return state;
}
