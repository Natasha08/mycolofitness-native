export default function(state= {}, { type, generated_workout }) {
  if (type === 'GENERATE_WORKOUT') {
    return generated_workout;
  }

  return state;
};
