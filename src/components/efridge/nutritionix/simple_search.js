import nutritionixRepository from 'repositories/nutritionix';
import SearchInput from 'components/efridge/nutritionix/search_input';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      foodBrand: '',
      foodName: ''
    }
  },

  updateFoodBrand: function(event) {
    this.setState({ foodBrand: event.target.value });
  },

  updateFoodName: function(event) {
    this.setState({ foodName: event.target.value });
  },

  submit: function() {
    const name = this.state.foodName,
    brand = this.state.foodBrand,
    errors = [];

    if (name && brand) {
      nutritionixRepository.fetch({ brand, name });
    } else if (!name && brand) {
      nutritionixRepository.fetchSimple({ query: brand });
    } else if (!brand && name) {
      nutritionixRepository.fetchSimple({ query: name });
    } else if (!brand && !name) {
      errors.push('please fill out the brand or food name to search');
    }
    this.setState({ errors: errors });
  },

  render: function() {
    const { title } = this.props;
    return(
      <div>
        <h1>{ title }</h1>
        <SearchInput hintText='Enter the food brand' floatingText='Food Brand' handleChange={this.updateFoodBrand} />
        <SearchInput hintText='Enter the food name' floatingText='Food Name' handleChange={this.updateFoodName} />
        <section>
          <button className='btn btn-nav' onClick={ this.submit }>
            <i className="fa fa-search" aria-hidden="true"></i>Search
          </button>
        </section>
        <section className='form-section'>
          <section className='form-errors'>{ this.state.errors }</section>
        </section>
      </div>
    );
  }
});
