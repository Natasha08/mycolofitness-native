export default function(state= {}, { type, filter }) {
  if (type === 'SET_VISIBILITY_FILTER') {
    return filter;
  }
  return state;
};
