


/*  PHASE 1 - Get the UI working

 	Jumbotron for the header
 	For upcoming train: Form with panel and legend
    For train input: Form with panel, legend:
     * train name 
	 * Destination
	 * First train time - in military time
	 * Frequency - in minutes 

	PHASE 2 - Get Firebase working on basic level

*/

var config = {
    apiKey: "AIzaSyA7GxLKi8V3D-CBZJhTw2NazOWYoGY41l8",
    authDomain: "train-scheduler-b7e2c.firebaseapp.com",
    databaseURL: "https://train-scheduler-b7e2c.firebaseio.com",
    storageBucket: "train-scheduler-b7e2c.appspot.com",
    messagingSenderId: "1016520910023"
  };
  firebase.initializeApp(config);

  var database = firebase.database();