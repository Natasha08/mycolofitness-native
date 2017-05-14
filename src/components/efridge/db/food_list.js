import selectedFood from 'actions/efridge';
import store from "store";
import DeleteDialog from 'components/dialogs/deleteDialog';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      searchFood: {},
      query: ''
    }
  },

  createList: function(items) {

    const { setItem, deleteFood, openFood } = this.props;

    if (items.length == 1) {
      const dialogProps = {
        open: true,
        delete: deleteFood,
        items: items[0],
        prompt: 'Are you sure you want to delete this food item?',
        title: 'Delete current food'
      };
      return (
        <div key={items[0].id}>
          <p className="food-list" onClick={ setItem(items[0], openFood) } key={items[0].id}>{items[0].brand} {items[0].food_name} </p>
          <DeleteDialog {...dialogProps} />
        </div>
      )

    }
    if (items.length > 1) {
      return _.map(items, function(item) {
        const dialogProps = {
          open: true,
          delete: deleteFood,
          items: item,
          prompt: 'Are you sure you want to delete this food item?',
          title: 'Delete current food'
        };

        return (
          <div key={item.id}>
            <p className="food-list" onClick={ setItem(item, openFood) } key={item.id}>{item.brand} {item.food_name} </p>
            <DeleteDialog {...dialogProps} />
          </div>
        )
      })
    }
  },

  render: function() {
    const foodPresent = this.props.searchFood < 1;

    return(
      <section>
        { foodPresent ? 'no food items' : this.createList(this.props.searchFood) }
      </section>
    );
  }
});
