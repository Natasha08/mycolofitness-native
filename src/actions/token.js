export default {
  saveToken: function(access_token) {
    return {
      type: 'SAVE_YOUTUBE_TOKEN',
      access_token
    }
  },
  videoIds: function(video_ids) {
    return {
      type: 'SAVE_VIDEO_IDS',
      video_ids
    }
  }
};
