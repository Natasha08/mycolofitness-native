import { Link } from 'react-router';
import FoodList from 'components/reports/daily_report';
import store from 'store';
import Dialog from 'components/dialogs/submitDialog';

const title = 'Your Reports';

export default React.createClass({
  getInitialState: function() {
    return {
      errors: [],
      viewDisplay: ''
    }
  },

  componentDidMount: function() {
    this.unsubscribe = store.subscribe(() => {
     this.setState(this.getInitialState());
    });
  },

  componentWillUnmount: function() {
    this.unsubscribe();
  },

  openFood: function(viewDisplay) {
    this.setState({ viewDisplay: viewDisplay });
  },

  exitForm: function(event) {
    event.preventDefault();
    this.setState({ viewDisplay: '' });
  },

  setView: function() {
    switch(this.state.viewDisplay) {
      case '':
      return;
      case 'viewReport':
      const ReportModalProps = {
        // selected_food: this.props.food_report,
        exitForm: this.exitForm
      };
      return <ReportModal {...ReportModalProps}/>;

    }
  },
  render: function() {
    const foodListProps = {
      setDisplayName: this.setDisplayName,
      openFood: this.openFood
    };
    const dialogProps = {
      open: true
    };
    return(
      <div className="wrapper">
        <section className='page-nav'>
          <button className='btn-nav btn-reg'><Link to="/efridge">Return</Link></button>
        </section>
        <section className='search-section'>
          <FoodList {...foodListProps}/>

        </section>
        <Dialog {...dialogProps} />
        { this.setView() }
      </div>
    );
  }
});
