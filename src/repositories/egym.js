import xhr from 'xhr';
import egymActions from 'actions/egym';
import store from 'store';

function authHeader(){
  // if(store.getState().auth.token) {
    const token = store.getState().auth.token;
    return _.assign({
       'Authorization': 'Bearer ' + token
    });
  // }
  return token;
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
      xhr(getApi()+`egym`, { method: 'GET',
      headers: authHeader()},
    function(err, resp, body) {
      if (resp.statusCode === 401) {
        console.log(err);
      }
      else if (resp.statusCode === 200 && resp.body) {
        const items = JSON.parse(body);
        const workouts = items.data;
        store.dispatch(egymActions.fetch(workouts));

      }
    })
  })
},

 post: function({ egym }) {
   return new Promise(function(resolve, reject) {
     xhr(getApi()+`egym`,
     { method: 'POST', json: { egym: egym }, headers: authHeader()},
     function(err, resp, body ) {
       if (resp.statusCode === 401) {
       }
       if (resp.statusCode === 200) {
         const api_message = body.message;
         console.log(api_message);
       }
     })
   })
 },
 delete: function(workout) {
   return new Promise(function(resolve, reject) {
     xhr(getApi()+`egym/deleteWorkout`,
     { method: 'POST', json: workout, headers: authHeader()},
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
};
