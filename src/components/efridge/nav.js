import { Link } from 'react-router';

export default React.createClass({

  render: function() {
    const displayName = this.props.displayName;

    return(
      <section className='page-nav'>
        <button className='btn btn-reg' onClick={ displayName('setDaily') }>Calculate Daily</button>
        <button className='btn btn-reg'><Link to="/reports">Daily Report</Link></button>
        <button className='btn btn-reg' onClick={ displayName('currentCalcModal') }>Show Calories/Macros</button>
        <button className='btn btn-reg' onClick={ displayName('currentCalcModal') }>Advanced Search</button>
        <button className='btn btn-reg' onClick={ displayName('newFood') }>New Food</button>
      </section>
    );
  }
});
