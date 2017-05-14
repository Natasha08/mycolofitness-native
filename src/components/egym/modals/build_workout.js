import Input from 'components/egym/modals/build_input';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      primary1: 'Primary Lift',
      primary1_weight: '',
      primary1_weightObj: null,
      primary1_weightOlympicObj: null,
      primary1_weightCheckbox: false,
      primary2: 'Primary Lift',
      primary2_weight: '',
      primary2_weightObj: null,
      primary2_weightOlympicObj: null,
      primary2_weightCheckbox: false,
      workout_day: '',
      dropdown: '',
      selected_primary: '',
      filteredSplit: {
        primary_lift: [],
        secondary_lift: [],
        workout_day: ''
      }
    }
  },

  calculateTriangleWeights: function(title, weight, checkboxValue) {
    const newWeight = Number(weight),
      stateWeight = this.state[title + 'Obj'],
      stateOlympicWeight = this.state[title + 'OlympicObj'];

    if (!weight && stateWeight) {

      if (!checkboxValue) {
        stateWeight.title = title;
        this.setState({ [title + 'Checkbox']: checkboxValue }, function() {
        });

      } else if(checkboxValue) {
          stateOlympicWeight.title = title;
          this.setState({ [title + 'Checkbox']: checkboxValue }, function() {
          });
      } else {
        return;
      }
    }

      if (weight) {

          const triangleWeights = {
            main: newWeight,
            warmupOne: Number((newWeight * 0.60).toFixed(2)),
            warmupTwo: Number((newWeight * 0.75).toFixed(2)),
            warmupThree: Number((newWeight * 0.9).toFixed(2)),
            mainTwo: Number((newWeight * 0.9).toFixed(2)),
            mainThree: Number((newWeight * 0.81).toFixed(2)),
            title
          };

          this.setState({ [title +'Obj']: triangleWeights }, function() {
            if (!checkboxValue) {
              console.log("CHECKBOX FALSE", checkboxValue)
            }
          });

          const triangleOlympicWeights = {
            main: ((newWeight - 45) / 2).toFixed(2),
            warmupOne: (((newWeight * 0.60) - 45) / 2).toFixed(2),
            warmupTwo: (((newWeight * 0.75) - 45) / 2).toFixed(2),
            warmupThree: (((newWeight * 0.9) - 45) / 2).toFixed(2),
            mainTwo: (((newWeight * 0.9) - 45) / 2).toFixed(2),
            mainThree: (((newWeight * 0.81) - 45) / 2).toFixed(2),
            title
          };

          this.setState({ [title +'OlympicObj']: triangleOlympicWeights }, function() {
            console.log("CHECKBOX TRUE", checkboxValue)
            if (checkboxValue) {
            }
            console.log("checked!");
          });
        }

      },

  handleChange: function(title, value, checkboxValue) {
    if (!value) {
      this.calculateTriangleWeights(title, value, checkboxValue);
    }
    this.setState({ [title]: value }, function() {
      this.calculateTriangleWeights(title, value, checkboxValue);
    });
  },

  handleLift: function(event, index, value) {
    this.setState({ primary1: value });
  },

  handleLift2: function(event, index, value) {
    this.setState({ primary2: value });
  },

  handleDropDown: function(event, index, value) {
    this.setState({ dropdown: value }, function() {
      this.setLifts();
    });
  },

  setLifts: function() {
    const workout_split = this.props.workout_split,
    workout_day = this.state.dropdown;

    const filteredSplit = _.find(workout_split, function(split) {
      return split.workout_day == workout_day;
    });

    this.setState({ filteredSplit }, function() {
      this.props.saveFilteredSplit(filteredSplit);
    });
  },

  generateWorkout: function() {
    const { primary_1, primary1_weightObj, primary1_weightOlympicObj,
      primary_2, primary2_weightObj, primary2_weightOlympicObj, primary1_weightCheckbox,
      primary2_weightCheckbox } = this.state;

    const generated_workout = { primary_1, primary1_weightObj, primary1_weightOlympicObj,
       primary_2, primary2_weightObj, primary2_weightOlympicObj, primary1_weightCheckbox, primary2_weightCheckbox
     };
     this.props.generateWorkout(generated_workout, this.props.exit);
  },

  render: function() {
    const { exitForm, workout_split } = this.props;
    const filteredSplit = this.state.filteredSplit;

    const style = {
      width: '30%'
    };

    const dropdownStyle = {
      customWidth: {
        width: 200,
      },
    };

    return(
      <div className='build form flex-column'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h3>Build your workout</h3>
        Workout Day
        <DropDownMenu title='workout_day' value={this.state.dropdown} onChange={this.handleDropDown}>
          <MenuItem key='0' value={'A'} primaryText="A" />
          <MenuItem key='1' value={'B'} primaryText="B" />
        </DropDownMenu>
        <span>Olympic Bar?</span>
        <section className='left-column'>
          <DropDownMenu title='primary1' value={this.state.primary1} onChange={this.handleLift} style={dropdownStyle.customWidth}>
            <MenuItem value={filteredSplit.primary_lift[0]} primaryText={filteredSplit.primary_lift[0]} />
            <MenuItem value={filteredSplit.primary_lift[1]} primaryText={filteredSplit.primary_lift[1]} />
          </DropDownMenu>
          <Input title='primary1_weight' floatingText='First main lift (lbs)'
          handleChange={this.handleChange} defaultValue={this.state.primary1_weight} type='number'/>

          <DropDownMenu title='primary2' value={this.state.primary2} onChange={this.handleLift2} style={dropdownStyle.customWidth}>
            <MenuItem value={filteredSplit.primary_lift[0]} primaryText={filteredSplit.primary_lift[0]} />
            <MenuItem value={filteredSplit.primary_lift[1]} primaryText={filteredSplit.primary_lift[1]} />
          </DropDownMenu>
          <Input title='primary2_weight' floatingText='Second main lift (lbs)'
            handleChange={this.handleChange} defaultValue={this.state.primary2_weight} type='number'/>
        </section>
        <RaisedButton
          label='Generate Workout'
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={(event) => {
            event.preventDefault();
            this.generateWorkout();
          }}
          style={{marginLeft: '40px', paddingBottom: '10px'}}
        />
      </div>
    );
  }
});
