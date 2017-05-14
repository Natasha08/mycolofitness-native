import { Link } from 'react-router';
import SnackBar from 'components/snack_bar';
import Stepper from 'components/egym/stepper';

import WorkoutForm from 'components/egym/modals/egym_form';
import Nav from 'components/egym/nav';
import DbSearch from 'components/egym/db/db_search';
import WorkoutModal from 'components/egym/modals/workout_modal';
import BuildWorkout from 'components/egym/modals/build_workout';
import GenerateWorkout from 'components/egym/modals/generate_workout';

const title = 'Your E-gym';

export default React.createClass({

  getInitialState: function() {
    return {
      confirmModalProps: null,
      errors: [],
      item: null,
      macrosRemaining: 0,
      selectedWorkout: '',
      viewDisplay: '',
      snackBar: false,
      snackBarMessage: ''
    }
  },

  componentDidMount: function() {
     this.setState(this.getInitialState(), function() {
       console.log("UPDATED PAGE");
     });
  },

  setDisplayName: function(viewDisplay) {
    return(event) => {
      this.setState({ viewDisplay: viewDisplay });
    }
  },

  openSnackBar: function(message, exitFunc) {
    this.setState({ snackBarMessage: message, snackBar: true }, exitFunc(event));
  },

  closeSnackBar: function() {
    this.setState({ snackBar: false });
  },

  exitForm: function(event) {
    event.preventDefault();
    this.setState({ viewDisplay: '' , item: null}, function() {
    });
  },

  openWorkout: function(viewDisplay) {
    this.setState({ viewDisplay: viewDisplay });

  },

  generateWorkout: function(generated_workout, exit) {
    this.props.generateWorkout(generated_workout);
    exit(event);
    this.setState({ viewDisplay: 'generateWorkout' });
  },

  setView: function() {
    switch(this.state.viewDisplay) {
      case '':
      return;
      case 'newWorkout':
        const WorkoutFormProps = {
          saveWorkout: this.props.saveWorkout,
          title: title,
          confirm: this.setConfirmModalProps,
          confirmProps: this.state.confirmModalProps,
          setDisplayName: this.setDisplayName,
          exit: this.exitForm,
          open: this.state.snackBar,
          openSnackBar: this.openSnackBar,
          closeSnackBar: this.closeSnackBar
        };
        return <WorkoutForm {...WorkoutFormProps}/>;
        case 'workoutModal':
          const workoutModalProps = {
            selected_workout: this.props.selected_workout,
            exitForm: this.exitForm
          };
          return <WorkoutModal {...workoutModalProps}/>;
        case 'buildWorkout':

          if (_.isEmpty(this.props.workout_split)) {
            return;
          }
          const buildModalProps = {
            workouts: this.props.workouts,
            exit: this.exitForm,
            workout_split: this.props.workout_split,
            generateWorkout: this.generateWorkout,
            saveFilteredSplit: this.props.saveFilteredSplit
          };
          return <BuildWorkout {...buildModalProps}/>;
        case 'generateWorkout':
          const generateProps = {
            workout: this.props.generated_workout,
            exit: this.exitForm,
            openSnackBar: this.openSnackBar,
            workout_split: this.props.filtered_split
          }
          return <GenerateWorkout {...generateProps} />;
        case 'addLifts':
        const stepperProps = {
          openSnackBar: this.openSnackBar,
          saveWorkoutSplit: this.props.saveWorkoutSplit,
          exit: this.exitForm
        };
        return <Stepper {...stepperProps}/>
    }
  },

  render: function(props) {
    const workouts = this.props.workouts;

    const snackBarProps = {
      open: this.state.snackBar,
      message: this.state.snackBarMessage,
      handleClose: this.closeSnackBar
    };

    const dbSearchProps = {
      setDisplayName: this.setDisplayName,
      workouts: this.props.workouts,
      openWorkout: this.openWorkout,
      exit: this.exitForm,
      deleteWorkout: this.props.deleteWorkout,
      open: this.state.snackBar,
      openSnackBar: this.openSnackBar,
      closeSnackBar: this.closeSnackBar
    };


    return(
      <div>
        <Nav className='nav' displayName = {this.setDisplayName} />
        { this.setView() }
        <DbSearch className='db-search' {...dbSearchProps}/>
        <SnackBar {...snackBarProps}/>
        <section className='form-errors'>{ this.props.errors }</section>
      </div>
    );
  }
});
