import React from 'react'
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

class SignUp extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
      		password: "",
      		signUp: false,
      		cPassword: "",
      		name: ""
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

	updateCPassword(event) {
		this.setState({
	  		cPassword: event.target.value
		});
	}

	updateName(event) {
		this.setState({
	  		name: event.target.value
		});
	}

	signUp(event) {
		if(this.state.password === this.state.cPassword) {
			const promise = firebase.auth().createUserWithEmailAndPassword(this.state.username, this.state.password);
	  		promise.then(function (user) {
	  			user.updateProfile({
  					displayName: "Test"
				}).then(function () {
					console.log("Name added");
				}, function (error) {
  					console.log("Error Code: " + error.code);
					console.log("Error Message: " + error.message);
				});
	  		}, function (error) {
	    		console.log("Cannot sign up");
	    		console.log("Error Code: " + error.code);
	    		console.log("Error Message: " + error.message);
	    	});
    	} else {
    		console.log("Passwords did not match");
    	}
	}

	render () {
		return (
			<div className="login">
				<input type="email" value={this.state.username} onChange={this.updateEmail.bind(this)} placeholder="email"/>
	            <br/>
		        <input type="password" value={this.state.password} onChange={this.updatePassword.bind(this)} placeholder="password"/>
	          	<input type="password" value={this.state.cPassword} onChange={this.updateCPassword.bind(this)} placeholder="confirm password"/>
	          	<br/>
	          	<input type="name" value={this.state.name} onChange={this.updateName.bind(this)} placeholder="name"/>
		        <br/>
	          	<button onClick={this.signUp.bind(this)}>Sign Up</button>
	          	<button onClick={this.props.toggleSignUp}>Back to log in</button>
	      	</div>
		);
	}
}

SignUp.propTypes = {
	toggleSignUp: PropTypes.func
}

export default SignUp;
