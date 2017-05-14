// import { Link, hashHistory } from 'react-router';
// import youtube from 'repositories/youtube';
// import uploader from 'repositories/upload';
// import store from 'store';
import React, { Component } from 'react';
import {
  Text,
  View,
  Button
} from 'react-native';
import styles from '../styles/style';
import {Actions} from 'react-native-router-flux';

class Home extends Component {

// export default class Home extends Component {
// export default React.createClass({
  // getInitialState() {
  //   return {
  //     errors: [],
  //     access_token: 'test',
  //     video_ids: 1
  //     // access_token: store.getState().access_token,
  //     // video_ids: store.getState().video_ids
  //   }
  // }

  // componentDidMount() {
    // youtube.fetch();
    // this.unsubscribe = store.subscribe(() => {
    //  this.setState(this.getInitialState(), function() {
    //    console.log("PAGE LOADED");

    //  });
    // });
  // }

  // handleFile(event) {
  //   console.log("EVENT", this.refs.newFile.files[0]);
  //   const video = this.refs.newFile.files[0],
  //     access_token = this.state.access_token;
  //     // uploader(video, access_token)


  // }
  onPress() {
    console.log("PRESSING BITCHES MO TIME")
  }

  render() {
    // jwplayer.key='3zsg43V7IQ7YHxsgvy61LRfI8FAIwou6briUKQ'
    // const access_token = this.state.access_token,
    // video_ids = this.state.video_ids,
    // src = "https://www.youtube.com/embed/"+video_ids;
    // <iframe type="text/html" width="640" height="360" src={src} ref='iframe' frameBorder="0"></iframe>
          // <input type='file' ref='newFile' onChange={this.handleFile}/>
        // <div className="home-main flex-column">
          // <section className='instructions'>
            // <h4>Welcome to MyColoFitness!</h4>
            // <button id="login-link" hidden> here</button>
            // <form hidden>
            //   <button className='btn btn-reg'>Send</button>
            // </form>
            // <p>
              // On the e-fridge page, you can search the nutritionix database <br /> for foods based on food name
              // with or without the label.<br /> Save the foods to your personal database.<br />
              // You can create your daily caloric and macro consumpetion, and track your consumption.
            // </p>
            // <p>
              // On the e-gym page, you can set your different strength exercises,<br /> generate your workout to print/save,<br />
              // and save your workouts.<br /> You can also view your workouts in the reports section.
            // </p>
          // </section>
          // <section className='content'>
            // <p>Follow me on twitter to learn about updates to app.<br /> Checkout my blog on our journey to health!</p>
            // <p>Checkout my new blog where I share my steps<br /> towards health, achievement and living life</p>
            // <p>Interested in programming? I built this site.<br />This is an open source project, code availabe
              // <a href="https://github.com/Natasha08/mycolofitness" target="_blank"> here</a>
        //     </p>
        //   </section>
        // </div>
    return(
      <View style={styles.container}>
        <Text style={styles.text}>
          Welcome to My Fitness App!
        </Text>
        <View>
          <Button title="Go to Login page" onPress={()=>Actions.login({data:"Custom data", title:'Login' })}></Button>
        </View>
      </View>
    );
  }
};

export default Home;
