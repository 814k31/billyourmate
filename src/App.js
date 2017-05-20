import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      firebaseUser: null
    };
  }

  componentDidMount() {
    const rootRef = firebase.database().ref().child('react');
    const speedRef = rootRef.child('speed');
    speedRef.on('value', snap => {
      this.setState({
      });
    });
  }

  updateEmail(event) {
    this.setState({
      username: event.target.value
    });
  }

  updatePassword(event) {
    this.setState({
      password: event.target.value
    });
  }

  submitForm(event) {
  // triggered when someone logs in or logs out
  firebase.auth().onAuthStateChanged(inFirebaseUser => {
    if(inFirebaseUser)
    {
      console.log("Log in successful!");
      this.setState({
        firebaseUser: inFirebaseUser
      });
      //firebase.auth().signOut();
    }
    else {
      console.log("nothing happened");
    }

    const promise = firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
    promise.catch(e => console.log(e.message));     
  });

  }
  render() {
    return (
      <div className="App">
        <div className="background"></div>
        <div className="header">
          <div>Bill your mate</div>
        </div>
        <div className="login">
          <input type="email" value={this.state.username} onChange={this.updateEmail.bind(this)} placeholder="email"/>
          <br/>
          <input type="password" value={this.state.password} onChange={this.updatePassword.bind(this)} placeholder="password"/>
          <br/>
          <button onClick={this.submitForm.bind(this)}>Log In</button>
          <br/>
        </div>
      </div>
    );
  }
}

export default App;
