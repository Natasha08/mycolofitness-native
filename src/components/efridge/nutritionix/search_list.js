import selectedFood from 'actions/efridge';
import store from "store";
import efridgeRepository from 'repositories/efridge';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      searchFood: {}
    }
  },

  saveFood: function(item) {

    const food = item.fields;

    const efridge = {
      food_name: food.item_name,
      brand: food.brand_name,
      serving_size: food.nf_serving_size_qty,
      serving_size_unit: food.nf_serving_size_unit,
      total_calories: Number(food.nf_calories),
      fat_grams: Number(food.nf_total_fat),
      carbohydrate_grams: Number(food.nf_total_carbohydrate),
      protein_grams: Number(food.nf_protein)
    };


     function calculateGrams() {
       return efridge.fat_grams+efridge.carbohydrate_grams+efridge.protein_grams;
     }
     efridge.total_grams = calculateGrams();

     efridgeRepository.post({efridge});
     store.dispatch(selectedFood.set(efridge));
    //  this.props.handleNutritionix(efridge, function() {
    //   this.props.exitForm;
    // });
  },

  setItem: function(item, openFood, saveFood) {
    this.props.setFood(item);
    return (
      function set() {
        saveFood(item);
        openFood('nutritionixModal');
      }
    );
  },

  render: function() {
    const { foodSearch, openFood, setFood } = this.props,
    foodPresent = foodSearch.length >= 1,
    foodList = function(items, setItem, saveFood) {
      if (!items) {
        return console.log('no search items');
      }
      if (items.length == 1) {

        return <p className="search-list" onClick={ setItem(items[0], openFood, saveFood) } key={items[0]._id}>{items[0].fields.brand_name} {items[0].fields.item_name}</p>
      }
      if (items.length > 1) {
        return _.map(items, function(item) {
          return (
            <p className="search-list" onClick={ setItem(item, openFood, saveFood) } key={item._id}>{item.fields.brand_name} {item.fields.item_name}</p>
          )
        })
      }
    };
    const title = function() {
      if (foodPresent) {
        return <h4>Search Results</h4>
      }
    };
    return(
      <div className='simple-search'>
        { title() }
        { foodPresent ? foodList(foodSearch, this.setItem, this.saveFood): 'no food items'  }
      </div>
    );
  }
});
