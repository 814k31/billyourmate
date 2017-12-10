import React from 'react'
import * as firebase from 'firebase';
import './Dashboard.css';

class Dashboard extends React.Component {
	signOut(event) {
		firebase.auth().signOut();
	}

	regenerateSantas(event) {
		const people = [
			{
				name: 'Damon',
				code: '9AcPf',
				dontMatchWith: 'Dana'
			},
			{
				name: 'Dana',
				code: '72ve6',
				dontMatchWith: 'Damon'
			},
			{
				name: 'Matthew',
				code: '26oYp',
				dontMatchWith: 'Astrid'
			},
			{
				name: 'Astrid',
				code: 'TSkkJ',
				dontMatchWith: 'Matthew'
			},
			{
				name: 'Braedon',
				code: 'qVNB5',
				dontMatchWith: 'Brittany',
			},
			{
				name: 'Brittany',
				code: 'XfGj3',
				dontMatchWith: 'Braedon'
			},
			{
				name: 'Blake',
				code: 'JWmat',
				dontMatchWith: ''
			},
			{
				name: 'Carter',
				code: 'vnmL4',
				dontMatchWith: ''
			},
		]

		var notGenerated = true;
		//while (notGenerated) {
			var count = 0;
			var keepGoing = true;
			people.forEach(person => {
console.log(person)
				var faildCount = 0;
				var noMatch = true;
				while (noMatch && keepGoing) {
					var index = Math.floor(Math.random() * (people.length));
//console.log(index);
					if (people[index].name === person.name || people[index].name === person.dontMatchWith || people.find(match => {
						return people[index].name === match.match;
					}))
						faildCount++;
					else {
						person.match = people[index].name;
						noMatch = false;
					}

					if (faildCount >= 50) {
						noMatch = false;
						keepGoing = false;
						console.log("Failed, please retry", count, notGenerated);
						console.log(people);
						return;
					}
				}
			});

			if (keepGoing) {
				firebase.database().ref('react').set({
					santas: people,
					codes: people.map(person => {
						return {
							name: person.name,
							code: person.code
						}
					})
				});
			}

			if (count > 2)
				notGenerated = false;
			else
				count++;
		//}
console.log(people)
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
				<button onClick={this.regenerateSantas.bind(this)}>Re Generate Santas</button>
        		<button onClick={this.signOut}>Sign Out</button>
    		</div>
    	);
	}
}

export default Dashboard;
