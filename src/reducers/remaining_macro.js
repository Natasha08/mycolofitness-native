export default function(state= {}, { type, remaining_macro }) {
  if (type === 'POST_REMAINING_MACRO') {
    return remaining_macro;
  }

  return state;
};
