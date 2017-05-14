export default function(state= {}, { type, workouts }) {
  if (type === 'FETCH_WORKOUTS') {
    return workouts;
  }
  return state;
};
