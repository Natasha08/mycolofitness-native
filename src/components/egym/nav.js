export default class extends React.Component {

  render() {
    const displayName = this.props.displayName;

    return(
      <section className='page-nav'>
        <button className='btn btn-reg' onClick={ displayName('newWorkout') }>New Workout</button>
        <button className='btn btn-reg' onClick={ displayName('buildWorkout') }>Build Workout</button>
        <button className='btn btn-reg' onClick={ displayName('addLifts') }>Add Lifts</button>
      </section>
    );
  }
}
