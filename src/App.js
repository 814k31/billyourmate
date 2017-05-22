import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import LogIn from './LogIn';

class App extends Component {
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

  signOut(event) {
    firebase.auth().signOut();
  }

  render() {
    if(!this.state.firebaseUser) {
      return <LogIn/>;
    } else {
      return (
        <div>
          <h1>Logged In!</h1>
          <button onClick={this.signOut}>Sign Out</button>
        </div>
      );
    }
  }
}

export default App;
