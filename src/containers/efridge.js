import EfridgePage from 'pages/efridge';

import { Link } from 'react-router';
import store from 'store';

import efridgeActions from 'actions/efridge';
import selectedFood from 'actions/efridge';
import efridgeRepository from 'repositories/efridge';
import calcRepository from 'repositories/calc';

export default React.createClass({

  getInitialState: function() {
    return {
      errors: [],
      food_items: store.getState().food_items,
      daily_calc: store.getState().daily_calc,
      current_calc: store.getState().current_calc,
      food_search: store.getState().food_search,
      selected_food_item: store.getState().selected_food_item,
      auth: store.getState().auth
    }
  },

  componentDidMount: function() {
    efridgeRepository.fetch().then(function(resp) {
      store.dispatch(efridgeActions.fetch(resp));
      return console.log("COMPONENT MOUNTED");
    })
    calcRepository.fetchCalc()
    calcRepository.fetchCurrentCalc()

    this.unsubscribe = store.subscribe(() => {
     this.setState(this.getInitialState(), function() {
       console.log("PAGE LOADED");

     });
    });
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  saveFood: function(efridge) {
    efridgeRepository.post(efridge)
    .then(function(resp) {
      console.log("SAVED FOOD")
    });

    const getFood = function() {
      efridgeRepository.fetch().then(function(resp) {
        store.dispatch(efridgeActions.fetch(resp));
         return console.log("REPO CALLED AFTER FOOD SAVED");
      })
    };
    setTimeout(function() {
      getFood();
    }, 500);
  },
  deleteFood: function(food) {
    efridgeRepository.deleteFood(food)
     .then(function(resp) {
       console.log("DELETED FOOD")
     });
    const getFood = function() {
      efridgeRepository.fetch().then(function(resp) {
        store.dispatch(efridgeActions.fetch(resp));
         return console.log("REPO CALLED AFTER FOOD DELETED");
      })
    };
    setTimeout(function() {
      getFood();
    }, 500);
  },

  deleteCurrentCalc: function() {
    calcRepository.deleteCurrentCalc()
     .then(function(resp) {
       console.log("CURRENT CALC DELETED");
     })
     const getCurrentCalc = function() {
       calcRepository.fetchCurrentCalc().then(function(resp) {
         store.dispatch(efridgeActions.fetchCurrentCalc(resp))
       })
     };
     setTimeout(function() {
       getCurrentCalc();
     }, 500);
  },

  saveNewServing: function(changedFood) {
    store.dispatch(selectedFood.set(changedFood));
  },

  postCurrentCalc: function(currentCalc) {
    calcRepository.postCurrentCalc(currentCalc)
      .then(function(resp) {
        console.log("FIRST CURRENT CALC SAVED");
      })
    const getCurrentCalc = function() {
      calcRepository.fetchCurrentCalc().then(function(resp) {
        store.dispatch(efridgeActions.fetchCurrentCalc(resp))
      })
    };
    setTimeout(function() {
      getCurrentCalc();
    }, 500);
  },

  updateCurrentCalc: function(updatedCalc) {
    calcRepository.updateCurrentCalc(updatedCalc)
     .then(function(resp) {
       console.log("CURRENT CALC UPDATED");
     })
     const getCurrentCalc = function() {
       calcRepository.fetchCurrentCalc().then(function(resp) {
         store.dispatch(efridgeActions.fetchCurrentCalc(resp))
       })
     };
     setTimeout(function() {
       getCurrentCalc();
     }, 500);
  },

  postDailyCalc: function(postCalc) {
    calcRepository.postCalc(postCalc)
     .then(function(resp) {
       console.log("NEW DAILY CALC ADDED");
     })
     const getDailyCalc = function() {
       calcRepository.fetchCalc().then(function(resp) {
         store.dispatch(efridgeActions.fetchDailyCalc(resp))
       })
     };
     setTimeout(function() {
       getDailyCalc();
     }, 500);
  },

  render: function() {
    const pageProps = {
      ...this.state,
      deleteFood: this.deleteFood,
      saveFood: this.saveFood,
      deleteCurrentCalc: this.deleteCurrentCalc,
      saveNewServing: this.saveNewServing,
      postCurrentCalc: this.postCurrentCalc,
      postCalc: this.postDailyCalc
    };

    return <EfridgePage {...pageProps} />;
  }
})
