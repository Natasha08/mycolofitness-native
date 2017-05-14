import selectedWorkout from 'actions/egym';
import store from "store";
import DbWorkoutList from 'components/egym/db/workout_list';
import DatePicker from 'material-ui/DatePicker';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      workoutQuery: {},
      query: {}
    }
  },

  updateState: function() {
    this.setState(this.getInitialState(), function() {
      console.log("UPDATED LIST");
    });
  },

  handleInputChange: function(event, date) {
    const workouts = this.props.workouts,
      query = '';

    this.setState({ query: date }, function(query) {
      query = this.state.query;
      this.searchWorkouts(workouts, query);
    });

  },

  setItem: function(item, openWorkout) {
    return (
      function set() {
        store.dispatch(selectedWorkout.set(item));
        openWorkout('workoutModal');
      }
    );
  },

  setWorkout: function(item) {
    this.setState({ workoutQuery: item });
  },

  searchWorkouts: function(workouts, query) {
    const searches = [];

     _.filter(workouts, function(item) {
       const workoutDate = new Date(item.date).toLocaleDateString(),
       currentDate = new Date(query).toLocaleDateString();

       if (currentDate === '' || null) {
         return '';
       }

       if (workoutDate.indexOf(currentDate) > -1) {
         searches.push(item);
       }
    });
    this.setWorkout(searches);
  },

  deleteWorkout: function(item, closeModal) {
    const updateState = this.updateState,
    {exit, saveWorkout, openSnackBar, deleteWorkout} = this.props;

    return (
      function set() {
        deleteWorkout(item)
        updateState();
        closeModal();
        openSnackBar('Your workout has been deleted!', function() {
          exit(event);
        });
      }
    );
  },

  render: function() {
    const { workouts, openWorkout } = this.props;

    const title = function() {
      return <h2>Search your saved workouts</h2>;
    };
    const workoutListProps = {
      setItem: this.setItem,
      deleteWorkout: this.deleteWorkout,
      openWorkout: this.props.openWorkout,
      workoutQuery: this.state.workoutQuery
    };

    return(
      <div className='search-section'>
        { title() }
        <DatePicker hintText="Workout Date" value={this.state.query} onChange={this.handleInputChange} />
        <DbWorkoutList {...workoutListProps}/>
      </div>
    );
  }
});
