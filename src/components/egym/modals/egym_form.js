import SubmitDialog from 'components/dialogs/submitDialog';
import ModalInput from 'components/modal_input';
import DatePicker from 'material-ui/DatePicker';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      date: {},
      workout_day: '',
      key_lift1: '',
      weight1: '',
      reps1: '',
      key_lift2: '',
      weight2: '',
      reps2: ''
    }
  },

  setDate: function(event, date) {
    this.setState({
      date: date,
    });
  },

  submit: function() {
    const egym = {
      "date": this.state.date,
      "workout_day": this.state.workout_day,
      "key_lift1": {
        "name": this.state.key_lift1,
        "set1": {
          "weight1": this.state.weight1,
          "reps1": this.state.reps1
        }
      },
      "key_lift2": {
        "name": this.state.key_lift2,
        "set1": {
          "weight1": this.state.weight2,
          "reps1": this.state.reps2
        }
      }
    }

     const {exit, saveWorkout, openSnackBar} = this.props;
     saveWorkout({egym});
     openSnackBar('Your workout has been saved!', function() {
       exit(event);
     });
  },

  handleChange: function(title, value) {
    this.setState({ [title]: value });
  },

  render: function() {
    const { title, exitForm } = this.props;

    const dialogProps = {
      open: true,
      submit: this.submit,
      title: 'Save your new workout',
      prompt: 'Ready to save this new workout?'
    };

    return(
      <div className='form flex-column'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        <section className='form-section'>
          <DatePicker hintText="Workout Date" value={this.state.date} onChange={this.setDate} />
          <ModalInput title= 'workout_day' hintText='Enter the workout day ( A or B )' floatingText='Workout Day'
            handleChange={this.handleChange} defaultValue={this.state.workout_day} type='text' />
          <ModalInput title= 'key_lift1' hintText='Enter key lift 1' floatingText='Key lift 1' type='text'
            handleChange={this.handleChange} defaultValue={this.state.key_lift1} />
          <ModalInput title= 'weight1' hintText='Enter weight' floatingText='Weight(lbs)' type='number'
            handleChange={this.handleChange} defaultValue={this.state.weight1} />
          <ModalInput title= 'reps1' hintText='Enter reps' floatingText='Reps' type='number'
            handleChange={this.handleChange} defaultValue={this.state.reps1} />
          <ModalInput title= 'key_lift2' hintText='key lift 2' floatingText='Key lift 2' type='text'
            handleChange={this.handleChange} defaultValue={this.state.key_lift2} />
          <ModalInput title= 'weight2' hintText='Enter weight' floatingText='Weight' type='number'
            handleChange={this.handleChange} defaultValue={this.state.weight2} />
          <ModalInput title= 'reps2' hintText='Enter reps' floatingText='Reps' handleChange={this.handleChange}
           defaultValue={this.state.reps2} type='number' />
        </section>
        <section className='form-submit'>
         <SubmitDialog {...dialogProps}/>
        </section>
        <section className='form-section'>
          <section className='form-errors'>{ this.state.errors }</section>
        </section>
      </div>
    );
  }
});
