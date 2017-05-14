import selectedFood from 'actions/efridge';
import store from "store";

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      searchFood: {}
    }
  },

  setItem: function(item, openFood) {
    return (
      function set() {
        store.dispatch(selectedFood.set(item));
        openFood('viewReport');
      }
    );
  },

  render: function() {
    const { foodItems, openFood } = this.props;
    const searchFood = this.state.searchFood;
    const foodPresent = searchFood < 1;

    const foodList = function(items, setItem) {
      if (items.length == 1) {

        return <p className="food-list" onClick={ setItem(items[0], openFood) } key={items[0].id}>{items[0].brand} {items[0].food_name}</p>
      }
      if (items.length > 1) {
        return _.map(items, function(item) {
          return (
            <p className="food-list" onClick={ setItem(item, openFood) } key={item.id}>{item.brand} {item.food_name}</p>
          )
        })
      }
    };
    const title = 'Your Daily Report';
    return(
      <div>
       { title }
      </div>
    );
  }
});
