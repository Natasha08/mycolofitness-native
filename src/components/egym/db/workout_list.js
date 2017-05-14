import selectedFood from 'actions/efridge';
import store from "store";
import DeleteDialog from 'components/dialogs/deleteDialog';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      workoutQuery: {},
      query: ''
    }
  },

  createList: function(items) {

    const { setItem, deleteWorkout, openWorkout } = this.props;

    if (items.length == 1) {
      const dialogProps = {
        open: true,
        delete: deleteWorkout,
        items: items[0],
        prompt: 'Are you sure you want to delete this workout?',
        title: 'Delete current workout'
      };
      const newDate = new Date(items[0].date).toLocaleDateString();

      return (
        <div key={items[0].id}>
          <p className="food-list" onClick={ setItem(items[0], openWorkout) } key={items[0].id}>Date: {newDate} Workout Day: {items[0].workout_day} </p>
          <DeleteDialog {...dialogProps} />
        </div>
      )

    }
    if (items.length > 1) {
      return _.map(items, function(item) {
        const dialogProps = {
          open: true,
          delete: deleteWorkout,
          items: item,
          prompt: 'Are you sure you want to delete this workout?',
          title: 'Delete current workout'
        };
        const newDate = new Date(item.date).toLocaleDateString();

        return (
          <div key={item.id}>
            <p className="food-list" onClick={ setItem(item, openWorkout) } key={item.id}>Date: {newDate} Workout Day: {item.workout_day} </p>
            <DeleteDialog {...dialogProps} />
          </div>
        )
      })
    }
  },

  render: function() {
    const workoutPresent = this.props.workoutQuery < 1;

    return(
      <section>
        { workoutPresent ? 'no workouts' : this.createList(this.props.workoutQuery) }
      </section>
    );
  }
});
