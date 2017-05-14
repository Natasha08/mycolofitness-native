import xhr from 'xhr';
import store from 'store';
import efridgeActions from 'actions/efridge';

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
  fetch: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge`, { method: 'GET',
      headers: authHeader()},
      function(err, resp, body) {

        if (resp.statusCode === 401) {
          return console.log("NOT AUTHORIZED");
        }
        else if (resp.statusCode === 200 && resp.body) {
          const response = JSON.parse(resp.body);
          return resolve(response.data);
          // return store.dispatch(efridgeActions.fetch(response.data));
        }
      })
    })
  },

  post: function({ efridge }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge`,
      { method: 'POST', json: { efridge: efridge }, headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          resolve(resp.body.data);
          return api_message;
        }
      })
    })
  },
  deleteFood: function(efridge) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/deleteFood`,
      { method: 'POST', json: efridge, headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          resolve(resp.body.message);
          return api_message;
        }
      })
    })
  }
}
