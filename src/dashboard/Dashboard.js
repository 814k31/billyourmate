import React from 'react'
import * as firebase from 'firebase';
import './Dashboard.css';

class Dashboard extends React.Component {
	signOut(event) {
		firebase.auth().signOut();
	}

	render() {
		let user = '';
		if(firebase.auth().currentUser.displayName) {
			user = ' ' + firebase.auth().currentUser.displayName;
		} else {
			user = ' ' + firebase.auth().currentUser.email;
		}

		return (
	        <div className="mainPage">
				<div className="title">Welcome{user}!</div>
        		<button onClick={this.signOut}>Sign Out</button>
    		</div>
    	);
	}
}

export default Dashboard;
