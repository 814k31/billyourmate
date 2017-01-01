//firebase initialize
var config = {
    apiKey: "AIzaSyDjW5THPlw8berjWWul73PfRsifR_HUg5Y",
    authDomain: "billyourmate.firebaseapp.com",
    databaseURL: "https://billyourmate.firebaseio.com",
    storageBucket: "billyourmate.appspot.com",
    messagingSenderId: "670004349972"
  };
  firebase.initializeApp(config);

//assign visual componants to js code
const txtEmail = document.getElementById("userid");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("loginButton");

// triggered when login button is clicked
function logIn(form){
	const auth = firebase.auth();

	const email = txtEmail.value;
	const password = txtPassword.value;

	const promise = auth.signInWithEmailAndPassword(email, password);

	promise.catch(e => console.log(e.message));			
}

// triggered when someone logs in or logs out
firebase.auth().onAuthStateChanged(firebaseUser => {
	if(firebaseUser)
	{
		alert("Log in successful!");
		firebase.auth().signOut();
	}
	else
	{
	}
});

//triggered when the sign up button is clicked
function signUp(form){
	
}
