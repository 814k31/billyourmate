import React from 'react'
import * as firebase from 'firebase';
import SignUp from '../signup/SignUp';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import './Login.css';

class LogIn extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			signUp: false,
			login: false,
			userCode: '',
			santas: [],
			chosenOne: null
		}
	}

	componentDidMount () {
		const rootRef = firebase.database().ref().child('react');
		const secretSantaRef = rootRef.child('santas');

		secretSantaRef.on('value', snap => {
			this.setState({santas: snap.val()});
		})
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
	checkSecretSantaCode(event) {
		var chosen = this.state.santas.find(person => {
			return person.code === this.state.userCode;
		});
		if (chosen) {
			this.setState({
				chosenOne: chosen.match
			});
		} else {
			this.setState({
				chosenOne: 'incorrect code'
			})
		}
	}
////<input type="email" value={this.state.username} onChange={this.updateEmail.bind(this)} placeholder="email"/>
//<br/>
//<input type="password" value={this.state.password} onChange={this.updatePassword.bind(this)} placeholder="password"/>
//<br/>
				
//				  <button onClick={this.login.bind(this)}>Log In</button>
//				  <button onClick={this.toggleSignUp.bind(this)}>Sign Up</button>


	render() {
		let form = null;
		let chosenOne = null;
		if (this.state.chosenOne) {
			chosenOne = <label className="santa">{this.state.chosenOne}</label>;
			if (!this.state.chosenOne.length)
				chosenOne = <label className="santa bad">Tell Blake to regenerate matches</label>
		}

		if(!this.state.signUp && this.state.login) {
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
						<RaisedButton label="You Dickhead" onClick={this.toggleLogin.bind(this)} />
						{/*<RaisedButton label="Sign up" onClick={this.toggleSignUp.bind(this)} />*/}
					</div>
				</div>
			);
		} else if (this.state.signUp) {
			form = <SignUp toggleSignUp={this.toggleSignUp.bind(this)}/>
		} else {
			form = (
				<div className="login">
					<div>
						<div>
							<input className="secretCode" placeholder="Enter Secret Code" value={this.state.userCode} type="password" onChange={e => this.setState({ userCode: e.target.value })} style={{width: 'calc(100% - 10px)'}}/>
							<RaisedButton label="Check Code" style={{float: 'left'}} onClick={this.checkSecretSantaCode.bind(this)}/>
							<RaisedButton label="Blake Only Button" onClick={this.toggleLogin.bind(this)} style={{float: 'right'}} />
						</div>
					</div>
					{chosenOne}
				</div>
			)
		}

		return (
			<div className="flex">
				<div className="header">
					<div>
						<div style={{textDecoration: 'line-through'}}>Bill your mate</div>
						<div>Secret Santa</div>
					</div>
				</div>
				{this.state.signUp}
				{form}
			</div>
		);
	}
}

export default LogIn;
