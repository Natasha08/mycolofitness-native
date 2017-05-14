export default function(state= {}, { type, video_ids }) {

  if (type === 'SAVE_VIDEO_IDS') {
    return video_ids;
  }
  return state;
}
