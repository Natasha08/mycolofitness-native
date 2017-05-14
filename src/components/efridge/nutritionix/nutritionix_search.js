import SimpleSearch from 'components/efridge/nutritionix/simple_search';
import SearchList from 'components/efridge/nutritionix/search_list';

export default React.createClass({
  render: function() {
    const searchProps = {
      openFood: this.props.openFood,
      setFood: this.props.setFood,
      handleNutritionix: this.props.handleNutritionix,
      foodSearch: this.props.foodSearch
    };

    return(
      <section className='search-section'>
        <SimpleSearch title='Search the nutritionix database'/>
        <SearchList {...searchProps}/>
      </section>
    );
  }
});
