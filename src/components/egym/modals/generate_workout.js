import Input from 'components/egym/modals/build_input';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  getInitialState: function() {
    return {
    }
  },

  componentDidMount: function() {
    this.calculateTriangleWeights();
  },

  calculateTriangleWeights: function() {
    const workout = this.props.workout,
    checkBox1 = workout.primary1_weightCheckbox,
    checkBox2 = workout.primary2_weightCheckbox;

    const triangleWeights = function (workoutObj){
      var workout = {};

      workout.main = workoutObj.main;
      workout.warmupOne = workoutObj.warmupOne;
      workout.warmupTwo = workoutObj.warmupTwo;
      workout.warmupThree = workoutObj.warmupThree;
      workout.mainTwo = workoutObj.mainTwo;
      workout.mainThree = workoutObj.mainThree;
      workout.title = workoutObj.title;

      return workout;
    };

    if (workout) {

      if (!checkBox1) {

         this.updateCanvas(workout.primary1_weightObj);
      }
       if(checkBox1) {
         this.updateCanvas(workout.primary1_weightOlympicObj);
       }
       if(!checkBox2) {
         this.updateCanvas(workout.primary2_weightObj);
       }
       if(checkBox2) {
         this.updateCanvas(workout.primary2_weightOlympicObj);
       } else {
         return;

       }
    }

  },

  updateCanvas: function(weight) {
    const canvas = this.refs.canvas,
      canvas2 = this.refs.canvas2;

    if (weight.title === 'primary1_weight') {

      if (canvas.getContext){
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillText(weight.warmupOne, 46, 125);
        ctx.fillText(weight.warmupTwo, 71, 90);
        ctx.fillText(weight.warmupThree, 93, 50);

        ctx.fillText(weight.main, 139, 20);
        ctx.fillText(weight.mainTwo, 185, 70);
        ctx.fillText(weight.mainThree, 230, 125);

        ctx.beginPath();
        ctx.moveTo(75,125);
        ctx.lineTo(225,125);
        ctx.lineTo(150,25);
        ctx.closePath();
        ctx.stroke();
      }
    }

    if (weight.title === 'primary2_weight') {

      if (canvas2.getContext){
        const context = canvas2.getContext('2d');
        context.clearRect(0, 0, canvas2.width, canvas2.height);
        context.fillText(weight.warmupOne, 41, 125);
        context.fillText(weight.warmupTwo, 69, 90);
        context.fillText(weight.warmupThree, 90, 50);

        context.fillText(weight.main, 139, 20);
        context.fillText(weight.mainTwo, 185, 70);
        context.fillText(weight.mainThree, 230, 125);

        context.beginPath();
        context.moveTo(75,125);
        context.lineTo(225,125);
        context.lineTo(150,25);
        context.closePath();
        context.stroke();
      }
    }
  },

  render: function() {
    const { exit, workout, workout_split } = this.props;
    console.log("WORKOUTSPLIT", workout_split)
    return(
      <div className='generate wide-form flex-column'>
      <a href='#' className='btn-close' onClick={ exit }>&times;</a>
      <h4>Workout Day: {workout_split.workout_day}</h4>
        <section className='flex-row'>
          <p>Primary Lift 1: {workout_split.primary_lift[0]}</p>
          <p>Primary Lift 2: {workout_split.primary_lift[1]}</p>
        </section>
        <section className='flex-row'>
          <canvas ref='canvas' className='canvas' />
          <canvas ref='canvas2' className='canvas' />
        </section>
        <section className='flex-row'>
          <p>Secondary Lift 1: {workout_split.secondary_lift[0]}</p>
          <p>Secondary Lift 2: {workout_split.secondary_lift[1]}</p>
        </section>
      </div>
    );
  }
});
