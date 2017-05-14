export default function(state= {}, { type, auth }) {
  if (type === 'SET_USER') {
    return auth;
  }
  return state;
}
