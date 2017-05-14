"use strict"

import { applyMiddleware, createStore } from "redux";
import _ from 'lodash';
import moment from 'moment';

import saveVideoIDS from 'reducers/video_ids';
import saveToken from 'reducers/token';
import workoutSplit from 'reducers/workout_split';
import selectedWorkout from 'reducers/selected_workout';
import generateWorkout from 'reducers/generate_workout';
import filteredSplit from 'reducers/filtered_split';

import efridge from 'reducers/efridge';
import selectedFoodItem from 'reducers/selected_food_item';
import currentCalc from 'reducers/current_calc';
import dailyCalc from 'reducers/daily_calc';
import remainingCal from 'reducers/remaining_cal';
import remainingMacro from 'reducers/remaining_macro';

import nutritionixSearch from 'reducers/nutritionix_search';

import auth from 'reducers/auth';
import egym from 'reducers/egym';
import filter from 'reducers/filter';

const rootReducer = (state = {}, action) => {
  return {
    auth: auth(state.auth, action),
    calories_remaining: remainingCal(state.remaining_cal, action),
    current_calc: currentCalc(state.current_calc, action),
    daily_calc: dailyCalc(state.daily_calc, action),
    food_items: efridge(state.food_items, action),
    food_search: nutritionixSearch(state.food_search, action),
    macro_remaining: remainingMacro(state.remaining_macro, action),
    selected_food_item: selectedFoodItem(state.foodItem, action),
    selected_workout: selectedWorkout(state.workout, action),
    visibility_filter: filter(state.filter, action),
    workouts: egym(state.workouts, action),
    workout_split: workoutSplit(state.workout_split, action),
    generated_workout: generateWorkout(state.generated_workout, action),
    access_token: saveToken(state.access_token, action),
    video_ids: saveVideoIDS(state.video_ids, action),
    filtered_split: filteredSplit(state.filtered_split, action)
  }
};

const store = Redux.createStore(rootReducer);
export default store;

store.subscribe(() => {
	console.log("store changed", store.getState());
})
