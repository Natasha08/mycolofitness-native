export default React.createClass({
  getInitialState: function() {
    return {
      errors: []
    }
  },

  render: function() {
    const title = 'Your selected workout',
      workout = this.props.selected_workout,
      workoutDate = new Date(workout.date).toLocaleDateString();

    return(
      <div className='form'>
        { workoutDate }
      </div>
    );
  }
});
