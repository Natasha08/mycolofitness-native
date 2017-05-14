import authActions from '../actions/auth';
// import efridgeRepository from './repositories/efridge';
// import egymRepository from './repositories/egym';
// import store from '../store';


// username:admin
// password:asdf
// email:natasha@me.com
// firstname:natasha

export default {
  login: function({ email, password }) {
    return new Promise(function(resolve, reject) {
      fetch("https://peaceful-coast-34394.herokuapp.com/api/token", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: email,
          password: password
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        const token = responseJson.token;
      })
      .catch(function(err) {
        console.log("+++++++++++++++++++++++++ERROR", err);
      })
    })
  },
  register: function({ username, password, email, firstname }) {
    return new Promise(function(resolve, reject) {
      fetch("https://peaceful-coast-34394.herokuapp.com/api/register", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: email,
          firstname: firstname

        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("==========++RESPONSE", responseJson);
      })
      .catch(function(err) {
        console.log("+++++++++++++++++++++++++ERROR", err);
      })

    })

  }
 };
