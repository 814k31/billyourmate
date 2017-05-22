import React from 'react'
import * as firebase from 'firebase';
import SignUp from './SignUp';

class LogIn extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
      		password: "",
      		signUp: false,
		}
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

	toggleSignUp(event) {
		console.log("toggle: " + this.state.signUp);
		this.setState({
			signUp: !this.state.signUp
		});
		console.log("after toggle: " + this.state.signUp + !this.state.signUp);
	}

	login(event) {
    	const promise = firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
    	promise.catch(function (error) {
    		console.log("Cannot log in");
    		console.log("Error Code: " + error.code);
    		console.log("Error Message: " + error.message);
    	});
	}

	render() {
	
		let form = null;

		if(this.state.signUp === false) {
			form = (
				<div className="login">
		          <input type="email" value={this.state.username} onChange={this.updateEmail.bind(this)} placeholder="email"/>
		          <br/>
		          <input type="password" value={this.state.password} onChange={this.updatePassword.bind(this)} placeholder="password"/>
		          <br/>
				  <button onClick={this.login.bind(this)}>Log In</button>
				  <button onClick={this.toggleSignUp.bind(this)}>Sign Up</button>
		        </div>
			);
		} else {
			form = <SignUp toggleSignUp={this.toggleSignUp.bind(this)}/>
		}

		return (
		  <div className="App">
	        <div className="background"></div>
	        <div className="header">
	          <div>Bill your mate</div>
	        </div>
	        {this.state.signUp}
	        {form}
    	  </div>      
    	);
	}
}

export default LogIn;
