import React from 'react'
import * as firebase from 'firebase';
import SignUp from '../signup/SignUp';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
		this.setState({
			signUp: !this.state.signUp
		});
	}

	login(event) {
    	const promise = firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password);
    	promise.catch(function (error) {
    		console.log("Cannot log in");
    		console.log("Error Code: " + error.code);
    		console.log("Error Message: " + error.message);
    	});
	}
////<input type="email" value={this.state.username} onChange={this.updateEmail.bind(this)} placeholder="email"/>
//<br/>
//<input type="password" value={this.state.password} onChange={this.updatePassword.bind(this)} placeholder="password"/>
//<br/>
				
//				  <button onClick={this.login.bind(this)}>Log In</button>
//				  <button onClick={this.toggleSignUp.bind(this)}>Sign Up</button>


	render() {
		let form = null;

		if(this.state.signUp === false) {
			form = (
				<div className="login">
		          <TextField hintText="Email Field"
						floatingLabelText="Email" value={this.state.username} type="email" onChange={e => this.setState({ username: e.target.value })}/>
	 				<br />
				  <TextField hintText="Password Field"
						floatingLabelText="Password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password"/>
					<br />
					<div style={{width: '256px', display: 'inline-flex', justifyContent: 'space-between'}}>
		        		<RaisedButton label="Log in" onClick={this.login.bind(this)} />
		        		<RaisedButton label="Sign up" onClick={this.toggleSignUp.bind(this)} />
		        	</div>
		        </div>
			);
		} else {
			form = <SignUp toggleSignUp={this.toggleSignUp.bind(this)}/>
		}

		return (
		  <div>
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
