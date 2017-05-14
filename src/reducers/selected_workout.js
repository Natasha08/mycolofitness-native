export default function(state= {}, { type, workout }) {

  if (type === 'SELECTED_WORKOUT') {
    return workout;
  }
  return state;
}
