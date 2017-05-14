import EgymPage from 'pages/egym';

import { Link } from 'react-router';
import store from 'store';

import egymActions from 'actions/egym';
import selectedWorkout from 'actions/egym';
import egymRepository from 'repositories/egym';
import workoutSplitRepository from 'repositories/workout_split';

export default React.createClass({

  getInitialState: function() {
    return {
      errors: [],
      workouts: store.getState().workouts,
      workout_split: store.getState().workout_split,
      auth: store.getState().auth,
      selected_workout: store.getState().selected_workout,
      generated_workout: store.getState().generated_workout,
      filtered_split: store.getState().filtered_split
    }
  },

  componentDidMount: function() {
    egymRepository.fetch().then(function(resp) {
      store.dispatch(egymActions.fetch(resp));
      return console.log("COMPONENT MOUNTED");
    })

    workoutSplitRepository.fetchSplit();

    this.unsubscribe = store.subscribe(() => {
     this.setState(this.getInitialState(), function() {
       console.log("PAGE LOADED");

     });
    });
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  setErrors: function(errors) {
    this.setState({ errors: errors });
  },

  getWorkouts: function() {
    const getWorkouts = function() {
      egymRepository.fetch().then(function(resp) {
        store.dispatch(egymActions.fetch(resp));
        return console.log("REPO CALLED AFTER WORKOUT SAVED");
      })
    };
    setTimeout(function() {
      getWorkouts();
    }, 500);
  },

  saveWorkout: function(egym) {
    egymRepository.post(egym)
    .then(function(resp) {
      console.log("SAVED WORKOUT");
    });
    this.getWorkouts();
  },

  deleteWorkout: function(workout) {
    egymRepository.delete(workout)
     .then(function(resp) {
       console.log("DELETED WORKOUT")
     });
     this.getWorkouts();
  },

  getWorkoutSplit: function() {
    const getWorkoutSplit = function() {
      workoutSplitRepository.fetchSplit().then(function(resp) {
        store.dispatch(egymActions.fetchWorkoutSplit(resp));
         return console.log("REPO CALLED AFTER WORKOUT SAVED");
      })
    };
    setTimeout(function() {
      getWorkoutSplit();
    }, 500);
  },

  saveWorkoutSplit: function(workoutSplit) {
    workoutSplitRepository.postSplit(workoutSplit)
    .then(function(resp) {
      console.log("SAVED WORKOUT SPLIT");
    });
    this.getWorkoutSplit();
  },

  deleteWorkoutSplit: function(workoutSplit) {
    workoutSplitRepository.deleteSplit(workoutSplit)
    .then(function(resp) {
      console.log("DELETED WORKOUT SPLIT");
    });
    this.getWorkoutSplit();
  },

  generateWorkout: function(generated_workout) {
    store.dispatch(egymActions.generateWorkout(generated_workout));
  },

  saveFilteredSplit: function(split) {
    store.dispatch(egymActions.saveFilteredSplit(split));
  },

  render: function() {
    const pageProps = {
      ...this.state,
      saveWorkout: this.saveWorkout,
      deleteWorkout: this.deleteWorkout,
      saveWorkoutSplit: this.saveWorkoutSplit,
      deleteWorkoutSplit: this.deleteWorkoutSplit,
      generateWorkout: this.generateWorkout,
      saveFilteredSplit: this.saveFilteredSplit,
      setErrors: this.setErrors
    };

    return <EgymPage {...pageProps} />;
  }
})
