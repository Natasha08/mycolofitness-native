import selectedFood from 'actions/efridge';
import store from "store";
import DbInput from 'components/efridge/db/search_input';
import DbFoodList from 'components/efridge/db/food_list';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      searchFood: {},
      query: ''
    }
  },

  updateState: function() {
    this.setState(this.getInitialState(), function() {
      console.log("UPDATED LIST");
    });
  },

  handleInputChange: function(event) {
    const foodItems = this.props.foodItems,
      query = '';

    this.setState({ query: event.target.value }, function(query) {
      query = this.state.query;
      this.searchFood(foodItems, query);
    });

  },

  setItem: function(item, openFood) {
    return (
      function set() {
        store.dispatch(selectedFood.set(item));
        openFood('foodModal');
      }
    );
  },

  setFood: function(item) {
    this.setState({ searchFood: item });
  },

  searchFood: function(foodItems, query) {
    const searches = [];

     _.filter(foodItems, function(item) {
       const foodName = item.food_name.toLowerCase();

       if (query === '' || null) {
         return '';
       }

       if (foodName.indexOf(query.toLowerCase()) > -1) {
         searches.push(item);
       }
    });
    this.setFood(searches);
  },

  deleteFood: function(item, closeModal) {
    const updateState = this.updateState,
    {exit, saveFood, openSnackBar, deleteFood} = this.props;

    return (
      function set() {
        deleteFood(item)
        updateState();
        closeModal();
        openSnackBar('Your food has been deleted!', function() {
          exit(event);
        });
      }
    );
  },

  render: function() {
    const { foodItems, openFood } = this.props;

    const title = function() {
      return <h2>Search your saved foods</h2>;
    }
    const inputProps = {
      hintText: 'Enter food name',
      floatingText: 'Search Saved Foods',
      handleChange: this.handleInputChange,
      foodItems: this.props.foodItems,
      setFood: this.setFood,
      query: this.state.query,
    };
    const foodListProps = {
      setItem: this.setItem,
      deleteFood: this.deleteFood,
      openFood: this.props.openFood,
      searchFood: this.state.searchFood
    };

    return(
      <div className='search-section'>
        { title() }
        <DbInput {...inputProps}/>
        <DbFoodList {...foodListProps}/>
      </div>
    );
  }
});
