export default function(state= {}, { type, filtered_split }) {
  if (type === 'SAVE_FILTERED_SPLIT') {
    return filtered_split;
  }
  return state;
};
