import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import filterActions from 'actions/visibility_filter';
import efridgeActions from 'actions/efridge';
import Layout from 'pages/layout';
import Efridge from 'containers/efridge';
import store from "store";

function mapStateToProps(state) {
  return {
    food_items: store.getState().food_items,
    daily_calc: store.getState().daily_calc,
    current_calc: store.getState().current_calc,
    food_search: store.getState().food_search,
    selected_food_item: store.getState().selected_food_item,
    workouts: store.getState().workouts,
    auth: store.getState().auth
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(efridgeActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Efridge);
