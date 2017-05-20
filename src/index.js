import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as firebase from 'firebase';

//firebase initialize
var config = {
    apiKey: "AIzaSyDjW5THPlw8berjWWul73PfRsifR_HUg5Y",
    authDomain: "billyourmate.firebaseapp.com",
    databaseURL: "https://billyourmate.firebaseio.com",
    storageBucket: "billyourmate.appspot.com",
    messagingSenderId: "670004349972"
};

firebase.initializeApp(config);


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
