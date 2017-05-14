import SubmitDialog from 'components/dialogs/submitDialog';
import ModalInput from 'components/modal_input';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      food_name: '',
      brand: '',
      serving_size: '',
      serving_size_unit: '',
      total_calories: '',
      fat_grams: '',
      carbohydrate_grams: '',
      protein_grams: '',
      total_grams: '',
    }
  },

  checkErrors: function() {
    const errors = [];

    const efridge = {
      food_name: this.state.food_name,
      brand: this.state.brand,
      serving_size: this.state.serving_size,
      serving_size_unit: this.state.serving_size_unit,
      total_calories: this.state.total_calories,
      fat_grams: this.state.fat_grams,
      carbohydrate_grams: this.state.carbohydrate_grams,
      protein_grams: this.state.protein_grams,
      total_grams: this.state.total_grams
     };

     const hasNull = function() {
       for (var member in efridge) {
         if (efridge[member] == '')
         return true;
       }
       return false;
     };

     if (hasNull() === true) {
       errors.push('Please fill out all of the fields');
       this.setState({ errors: errors });
     } else{
     }
  },

  submit: function() {
    const efridge = {
      food_name: this.state.food_name,
      brand: this.state.brand,
      serving_size: this.state.serving_size,
      serving_size_unit: this.state.serving_size_unit,
      total_calories: this.state.total_calories,
      fat_grams: this.state.fat_grams,
      carbohydrate_grams: this.state.carbohydrate_grams,
      protein_grams: this.state.protein_grams,
      total_grams: this.state.total_grams
     };

     const {exit, saveFood, openSnackBar} = this.props;

     saveFood({efridge});
     openSnackBar('Your food has been saved!', function() {
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
      title: 'Save your new food',
      prompt: 'Ready to save this new food?'
    };

    return(
      <div className='form flex-column'>
        <a href='#' className='btn-close' onClick={ exitForm }>&times;</a>
        <h1>{ title }</h1>
        <section className='form-section'>
          <ModalInput title= 'brand' hintText='Enter the brand of the food' floatingText='Food Brand' handleChange={this.handleChange} defaultValue={this.state.food_brand} />
          <ModalInput title= 'food_name' hintText='Enter the name of the food' floatingText='Food Name' handleChange={this.handleChange} defaultValue={this.state.food_name} />
          <ModalInput title= 'serving_size' hintText='Enter the serving size' floatingText='Serving Size' handleChange={this.handleChange} defaultValue={this.state.serving_size} />
          <ModalInput title= 'serving_size_unit' hintText='Enter the serving size unit' floatingText='Serving Size Unit' handleChange={this.handleChange} defaultValue={this.state.serving_size_unit} />
          <ModalInput title= 'total_calories' hintText='Enter the total calories' floatingText='Total Calories' handleChange={this.handleChange} defaultValue={this.state.total_calories} />
          <ModalInput title= 'fat_grams' hintText='Enter the fat (grams)' floatingText='Fat Grams' handleChange={this.handleChange} defaultValue={this.state.fat_grams} />
          <ModalInput title= 'carbohydrate_grams' hintText='Enter the carbohydrates (grams)' floatingText='Carbohydrate Grams' handleChange={this.handleChange} defaultValue={this.state.carbohydrate_grams} />
          <ModalInput title= 'protein_grams' hintText='Enter the protein (grams)' floatingText='Protein Grams' handleChange={this.handleChange} defaultValue={this.state.protein_grams} />
          <ModalInput title= 'total_grams' hintText='Enter the total grams' floatingText='Total Grams' handleChange={this.handleChange} defaultValue={this.state.total_grams} />
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
