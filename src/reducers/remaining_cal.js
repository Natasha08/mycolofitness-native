export default function(state= {}, { type, remaining_cal }) {
  if (type === 'POST_REMAINING_CAL') {
    return remaining_cal;
  }

  return state;
};
