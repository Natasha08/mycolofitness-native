export default {
  fetch: function(workouts){
    return {
      type: 'FETCH_WORKOUTS',
      workouts
    }
  },
  set: function(workout){
    return {
      type: 'SELECTED_WORKOUT',
      workout
    }
  },
  fetchWorkoutSplit: function(workout_split) {
    return {
      type: 'FETCH_WORKOUT_SPLIT',
      workout_split
    }
  },
  generateWorkout: function(generated_workout) {
    return {
      type: 'GENERATE_WORKOUT',
      generated_workout
    }
  },
  saveFilteredSplit: function(filtered_split) {
    return {
      type: 'SAVE_FILTERED_SPLIT',
      filtered_split
    }
  }
};
