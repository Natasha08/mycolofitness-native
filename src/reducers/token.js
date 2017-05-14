export default function(state= {}, { type, access_token }) {

  if (type === 'SAVE_YOUTUBE_TOKEN') {
    return access_token;
  }
  return state;
}
