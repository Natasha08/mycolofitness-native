import xhr from 'xhr';
import tokenActions from 'actions/token';
import store from 'store';

const youtube = {

  fetch: function() {
      const access_token = localStorage.getItem('access_token');
      const OAUTH2_CLIENT_ID = '385138583503-ks01qpvpnoqi1gqmo334k8nisf7v2n0f.apps.googleusercontent.com';
      const OAUTH2_SCOPES = [
        'https://www.googleapis.com/auth/youtube'
      ];
    gapi.load('client', function() {
      if (access_token) {
        localStorage.removeItem('access_token');
      }
        const googleApiClientReady = function() {
          gapi.auth.init(function() {
            window.setTimeout(checkAuth, 1);
          });
        };
        googleApiClientReady();
    })

      function checkAuth() {
        console.log("YSA")
        gapi.auth.authorize({
          client_id: OAUTH2_CLIENT_ID,
          scope: OAUTH2_SCOPES,
          immediate: false,
          response_type: 'token',
        }, handleAuthResult);
      }
      // curl https://accounts.google.com/o/oauth2/token -d "code=4/gzZI2HtSBbgUceu417pYhkto3sLliVtwXUcy_SPgglM&client_id=385138583503-ks01qpvpnoqi1gqmo334k8nisf7v2n0f.apps.googleusercontent.com&client_secret=nTZ2pKvkzirVd8tktCiysfqa&redirect_uri=http://localhost:3001/youtube&grant_type=authorization_code"
    //


      // Handle the result of a gapi.auth.authorize() call.
      function handleAuthResult(authResult) {
        const login = document.getElementById('login-link');

        if (authResult && !authResult.error) {
          console.log("GOOD JOB", authResult)
            validateToken(authResult.access_token)
              .then(function(resp) {
                console.log("RESP", resp)
                   localStorage.setItem('access_token', authResult.access_token);
                   store.dispatch(tokenActions.saveToken(authResult.access_token));
                   loadAPIClientInterfaces(authResult.access_token)
              })
              .catch(function(err) {
                console.log("err", err)
                localStorage.removeItem('access_token');

                login.click(function() {
                  gapi.auth.authorize({
                    client_id: OAUTH2_CLIENT_ID,
                    scope: OAUTH2_SCOPES,
                    approval_prompt: 'force',
                    redirect_uri: 'http://localhost:3001/youtube',
                    response_type: 'token'

                    }, handleAuthResult);
                });
              })
            }
        }

      const validateToken = function(new_token) {
        return new Promise(function(resolve, reject) {
          xhr(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=`+new_token, { method: 'POST'},
          function(err, resp, body) {

              const response = JSON.parse(resp.body);
              if (response === 'invalid_token') {

              console.log("ERROR RESPONSE", response);
              return reject(response.error);
            } else {

              console.log("RESPONSE", response)
              resolve(response.issued_to);
              return console.log("TOKEN VALIDATED", resp.body);
            }
          })
        })
      };

      function loadAPIClientInterfaces(access_token) {
        console.log("GAPI INTERFACE", gapi)
        gapi.client.load('youtube', 'v3', function() {
          console.log("API LOADED", gapi)
          // return handleAPILoaded();
        });
      }
    },

     uploadVideo: function(video, access_token) {
      return new Promise(function(resolve, reject) {
        // https://developers.google.com/apis-explorer/#p/youtube/v3/youtube.channels.list?
        // part=contentDetails
        // &mine=true
        // xhr(`https://www.googleapis.com/youtube/v3/videos?part=id&id`, { method: 'GET', headers: {
        //   'Authorization': 'Bearer '+access_token
        // }},
        // xhr(`https://www.googleapis.com/upload/youtube/v3/videos?part=id`, { method: 'POST', video, headers: {
        //    'Authorization': 'Bearer ' + access_token }},
        xhr(`https://www.googleapis.com/upload/youtube/v3/videos/part=id`, { method: 'GET', headers: {
          'Authorization': 'Bearer ' + access_token
        }, video },
        function(err, resp, body) {

          if (resp.statusCode === 401) {
            return console.log("NOT AUTHORIZED");
          }
          else if (resp.statusCode === 200 && resp.body) {
            const response = JSON.parse(resp.body);
            // const video_ids = response.items[0].id;
            // resolve(video_ids);
            // store.dispatch(tokenActions.videoIds(video_ids));
            return console.log("TOKEN VALIDATED", response);
          }
        })
      })
    },

  refreshYoutubeToken: function(refresh_token) {
    const OAUTH2_CLIENT_ID = '385138583503-ks01qpvpnoqi1gqmo334k8nisf7v2n0f.apps.googleusercontent.com';
    // Google Secret: nTZ2pKvkzirVd8tktCiysfqa

    return new Promise(function(resolve, reject) {
      xhr(getApi()+`token`,
      { method: 'POST', json: { refresh_token, password } }, function(err, resp, body ) {
          if (resp.statusCode === 401) {
            let errors = [];
            errors.push('Sorry, your login was unsuccessful');
            return errors;
          }
          else if (resp.statusCode === 200 && resp.body) {
            const auth = {
              token: body.token
            };
            console.log(auth);
            store.dispatch(authActions(auth));
            efridgeRepository.fetch()
            egymRepository.fetch()
            hashHistory.push('/home');
          }
      })
   })

 }

}

export default youtube;
