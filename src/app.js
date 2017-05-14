// import {Router, Route, IndexRedirect, hashHistory} from "react-router";
// import { Provider } from "react-redux";
// import store from "store";

// import Egym from 'containers/egym';
// import Efridge from 'containers/efridge';
// import Layout from "pages/layout";
// import Register from 'components/user/register_form';
// import Reports from 'pages/reports';

// import Authenticate from 'components/user/authenticate';
// import Privacy from 'components/user/privacy';

// import calcRepository from 'repositories/calc';
// import efridgeRepository from 'repositories/efridge';
// import egymRepository from 'repositories/egym';
// import nutritionixRepository from 'repositories/nutritionix';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {deepOrange600, blue900, blueGrey600, grey500, purple800, amber400, grey900 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import React, { Component } from 'react';
import Login from 'components/user/login_form';
import Home from 'pages/home';


import {Scene, Router} from 'react-native-router-flux';

class App extends React.Component {
        // <Scene key="register" component={Register} title="Register"/>
  render() {
    return <Router>
      <Scene key="root">
        <Scene key="login" component={Login} title="Login"/>
        <Scene key="home" component={Home}/>
      </Scene>
    </Router>
  }
}


// store.dispatch({ type: 'SET_USER', auth: { token: localStorage.getItem('auth_token')} });
// store.subscribe(() => {
//   const token = _.get(store.getState(), 'auth.token');
//   if (token) localStorage.setItem('auth_token', token);
// });

// const muiTheme = getMuiTheme({
//   fontFamily: 'Roboto, sans-serif',
//   zDepthShadows: 'none',
//   palette: {
//     primary1Color: blueGrey600,
//     primary2Color: deepOrange600,
//     accent1Color: amber400,
//     textColor: deepOrange600
//   },
//   appBar: {
//     height: 50,
//   },
// });

// class App extends Component {
//   render() {
//     return (
//       <MuiThemeProvider muiTheme={muiTheme}>
//         <Provider store={ store }>
//         	<Router history = { hashHistory }>
//               <Route component={ Layout }>
//           	    <Route path= "/" component = { Home } />
//                 <IndexRedirect to="/home" />
//                 <Route path = "/login" component = { Login }>
//                   <Route path = "privacy" component = { Privacy } />
//                 </Route>
//                 <Route path = "/register" component = { Register } />
//                 <Route path = "/reports" component = { Reports } />
//                 <Route path = "/home" component = { Home } />
//                 <Route path = "/egym" component = { Egym } />
//                 <Route path = "/efridge" component = { Efridge } />
//               </Route>
//         	</Router>
//         </Provider>
//       </MuiThemeProvider>
//     );
//   }
// }

// export default App;
