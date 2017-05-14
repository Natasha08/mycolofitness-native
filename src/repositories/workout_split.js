import xhr from 'xhr';
import store from 'store';
import egymActions from 'actions/egym';

function authHeader(){
  // if(store.getState().auth.token) {
    const token = store.getState().auth.token;
    return _.assign({
       'Authorization': 'Bearer ' + token
    });
  // }
  return 'no token';
}

const getApi = function() {
  if (process.env.APP_ENV) {
    return `/api/`;
  } else {
    return `/dev/`;
  }
};

export default {
  postSplit: function({ workoutSplit }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`egym/workoutSplit`,
      { method: 'POST', json: { workoutSplit: workoutSplit }, headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          console.log("API MESSAGE", api_message);
          return api_message;
        }
      })
    })
  },
  fetchSplit: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`egym/workoutSplit`, { method: 'GET',
      headers: authHeader()},
      function(err, resp, body) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 501) {
          console.log("501 ERROR", resp, body)
        }
        else if (resp.statusCode === 200 && resp.body) {
          const items = JSON.parse(resp.body);
          const workout_split = items.data;
          if (!workout_split) {
            return console.log("no workout split!");
          }
            console.log("WORKOUT SPLIT", workout_split);
            resolve(workout_split);
            return store.dispatch(egymActions.fetchWorkoutSplit(workout_split));
        }
      })
    })
  },

  updateSplit: function({ updatedSplit }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`egym/updateWorkoutSplit`,
      { method: 'POST', json: { updatedSplit: updatedSplit }, headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          console.log("API MESSAGE", api_message);
          resolve(resp.body.message);
          return api_message;
        }
      })
    })
  },
  deleteSplit: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`egym/deleteWorkoutSplit`,
      { method: 'POST', headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          console.log("API MESSAGE", api_message);
          resolve(resp.body.message);
          return api_message;
        }
      })
    })
  }
}
