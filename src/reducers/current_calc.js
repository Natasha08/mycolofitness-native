export default function(state= {}, { type, current_calc }) {
  if (type === 'FETCH_CURRENT_CALC') {
    return current_calc;
  }

  return state;
};
