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
  postCalc: function({ totalCalc }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/dailyCalc`,
      { method: 'POST', json: { totalCal: totalCalc }, headers: authHeader()},
      function(err, resp, body ) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 200) {
          const api_message = body.message;
          return api_message;
        }
      })
    })
  },
  fetchCalc: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/dailyCalc`, { method: 'GET',
      headers: authHeader()},
      function(err, resp, body) {
        if (resp.statusCode === 401) {
        }
        if (resp.statusCode === 501) {
          console.log("501 ERROR", resp, body)
        }
        else if (resp.statusCode === 200 && resp.body) {
          const items = JSON.parse(resp.body);
          const daily_calc = items.data;
          if (!daily_calc) {
            return console.log("no daily calc!");
          }
          if (daily_calc.length == 1) {
            store.dispatch(efridgeActions.fetchDailyCalc(daily_calc));
            resolve(daily_calc);
          } else if (daily_calc.length > 1) {
            const newCalc = daily_calc.pop();
            resolve(newCalc);
            return store.dispatch(efridgeActions.fetchDailyCalc(newCalc));
          }
        }
      })
    })
  },
  postCurrentCalc: function({ currentCalc }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/currentCalc`,
      { method: 'POST', json: { currentCalc: currentCalc }, headers: authHeader()},
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
  fetchCurrentCalc: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/currentCalc`, { method: 'GET',
      headers: authHeader()},
      function(err, resp, body) {
        if (resp.statusCode === 401) {
        }
        else if (resp.statusCode === 200 && resp.body) {
          const items = JSON.parse(resp.body);
          const current_calc = items.data;
          resolve(current_calc);
          return store.dispatch(efridgeActions.fetchCurrentCalc(current_calc));
        }
      })
    })
  },
  updateCurrentCalc: function({ updatedCalc }) {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/updateCurrentCalc`,
      { method: 'POST', json: { updatedCalc: updatedCalc }, headers: authHeader()},
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
  deleteCurrentCalc: function() {
    return new Promise(function(resolve, reject) {
      xhr(getApi()+`efridge/deleteCurrentCalc`,
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
