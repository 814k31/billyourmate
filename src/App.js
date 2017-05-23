import React from 'react';
import './App.css';
import * as firebase from 'firebase';
import LogIn from './login/LogIn';
import Dashboard from './dashboard/Dashboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      firebaseUser: null
    };

    // Triggered when someone logs in or logs out
    firebase.auth().onAuthStateChanged((inFirebaseUser) => {
      if(inFirebaseUser) {
        console.log("Log in successful!");
        this.setState({
          firebaseUser: inFirebaseUser
        });
      } else {
        console.log("Signed out");
        this.setState({
          firebaseUser: null
        });
      }
    });
  }

  render() {
    let login = null;
    if(!this.state.firebaseUser) {
      login = <LogIn/>;
    } else {
      login = <Dashboard/>;
    }

    return (
      <div className="App">
        <div className="background"></div>
        <div>
          {login}
        </div>
      </div>
    );
  }
}

export default App;
