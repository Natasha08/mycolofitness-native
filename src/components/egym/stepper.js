import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Input from 'components/modal_input';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

export default class extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      primary1: '',
      primary2: '',
      secondary1: '',
      secondary2: '',
      dropdown: ''
    };
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleInput = (title, value) => {
    this.setState({ [title]: value });
  };

  handleDropDown = (event, index, value) => {
    this.setState({ dropdown: value });
  };

  submitAnswers = () => {
    const workoutSplit = {
      primary_lift: [this.state.primary1, this.state.primary2],
      secondary_lift: [this.state.secondary1, this.state.secondary2],
      workout_day: this.state.dropdown
    };
   const {saveWorkoutSplit, openSnackBar} = this.props;

   saveWorkoutSplit({workoutSplit});
   openSnackBar('Your workout split has been saved!', function() {
   });
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 3 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto', paddingBottom: '20px'}}>
      <a href='#' className='btn-close' onClick={ this.props.exit }>&times;</a>

        <Stepper activeStep={stepIndex} orientation="vertical">
        <Step>
          <StepLabel>Enter Your Workout Day ( A or B Split): </StepLabel>
          <StepContent>
              <DropDownMenu value={this.state.dropdown} onChange={this.handleDropDown}>
                <MenuItem value={'A'} primaryText="A" />
                <MenuItem value={'B'} primaryText="B" />
              </DropDownMenu>
              {this.renderStepActions(0)}
          </StepContent>
        </Step>
          <Step>
            <StepLabel>Enter your primary lifts:</StepLabel>
            <StepContent id="primary_lift">
              <Input title='primary1' hintText='Create a primary lift' floatingText='Primary Lift'
                handleChange={this.handleInput} defaultValue={this.state.primary1} type='text' />
              <Input title='primary2' hintText='Create a primary lift' floatingText='Primary Lift'
                handleChange={this.handleInput} defaultValue={this.state.primary2} type='text' />
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Enter your secondary lifts: </StepLabel>
            <StepContent>
              <Input title='secondary1' hintText='Create a secondary lift' floatingText='Secondary Lift'
                handleChange={this.handleInput} defaultValue={this.state.secondary1} type='text' />
              <Input title='secondary2' hintText='Create a secondary lift' floatingText='Secondary Lift'
                handleChange={this.handleInput} defaultValue={this.state.secondary2} type='text' />
                {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Confirm your entries: </StepLabel>
            <StepContent>
              <span> Primaries: </span><br />
              <li> { this.state.primary1 } </li>
              <li> { this.state.primary2 } </li>
              <span> Secondaries: </span><br />
              <li> { this.state.secondary1 } </li>
              <li> { this.state.secondary2 } </li>
              {this.renderStepActions(3)}
            </StepContent>

          </Step>
        </Stepper>
        {finished && (
          <div style={{margin: '20px 0', textAlign: 'center'}}>
          <RaisedButton
            label='Finished'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={(event) => {
              event.preventDefault();
              this.submitAnswers();
            }}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label='Reset'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={(event) => {
              event.preventDefault();
              this.setState({ stepIndex: 0, finished: false,
                primary1: '', primary2: '', secondary1: '', secondary2: '' });
            }}
            style={{marginRight: 12}}
          />
          <RaisedButton
            label='Go Back'
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onTouchTap={(event) => {
              event.preventDefault();
              this.setState({ stepIndex: 0, finished: false });
            }}
            style={{marginRight: 12}}
          />
          </div>
        )}
      </div>
    );
  }
}
