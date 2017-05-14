export default function(state= {}, { type, daily_calc }) {
  if (type === 'FETCH_DAILY_CALC') {
    return daily_calc;
  }

  return state;
};
