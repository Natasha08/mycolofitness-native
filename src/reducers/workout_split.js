export default function(state= {}, { type, workout_split }) {

  if (type === 'FETCH_WORKOUT_SPLIT') {
    return workout_split;
  }
  return state;
}
