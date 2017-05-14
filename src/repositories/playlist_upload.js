import xhr from 'xhr';
import store from 'store';

function addToPlaylist(id, playlist_id) {
  var details = {
    videoId: id,
    kind: 'youtube#video'
  }
  console.log("PLAYLIST ID", playlist_id);

  var request = gapi.client.youtube.playlistItems.insert({
    part: 'snippet',
    resource: {
      snippet: {
        playlistId: playlist_id,
        resourceId: details
      }
    }
  });
  request.execute(function(response) {
    $('#status').html('<pre>' + JSON.stringify(response.result) + '</pre>');
  });
}

var playlist_id, channelId;

function getPlaylist(video_id) {
  var request = gapi.client.youtube.playlists.list({
    part: 'snippet', id: video_id,
    resource: {
      snippet: {
        id: ''
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    if (result) {
      console.log("GET PLAYLIST", result)
      // addToPlaylist( video_id, playlist_id);
    } else {
      $('#status').html('Could not create playlist');
    }
  });
}

function createPlaylist(video_id) {
  var request = gapi.client.youtube.playlists.insert({
    part: 'snippet,status',
    resource: {
      snippet: {
        title: 'Test Playlist Woot!',
        description: 'A private playlist created with the YouTube API'
      },
      status: {
        privacyStatus: 'private'
      }
    }
  });
  request.execute(function(response) {
    var result = response.result;
    if (result) {
      playlist_id = result.id;
      addToPlaylist( video_id, playlist_id);
    } else {
      $('#status').html('Could not create playlist');
    }
  });
}

export default getPlaylist;
