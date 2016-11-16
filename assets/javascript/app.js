


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

  var name = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;

  $(document).on('ready', function() {
  	$('#submit').on('click', function(){
  		name = $('#inputName').val().trim();
  		destination = $('#inputDestination').val().trim();
  		firstTrainTime = $('#inputFirstTime').val().trim();
  		frequency = $('#inputFrequency').val().trim();

  	database.ref().push({
  		name: name,
  		destination: destination,
  		firstTrainTime: firstTrainTime,
  		frequency: frequency
  	});

  	$('#inputName').val('');
    $('#inputDestination').val('');
    $('#inputFirstTime').val('');
    $('#inputFrequency').val('');

    return false;
  	});

  	database.ref().on("child_added", function(childSnapshot){

  		var tableRow = $('<tr>');

  		var nameCell = $('<td>').text(childSnapshot.val().name);
  		var destinationCell = $('<td>').text(childSnapshot.val().destination);
  		var firstTrainTimeCell = $('<td>').text(childSnapshot.val().firstTrainTime);
  		var frequencyCell = $('<td>').text(childSnapshot.val().frequency);

  		tableRow.append(nameCell).append(destinationCell).append(frequencyCell).append(firstTrainTimeCell);

  		$('tbody').append(tableRow);
  	});



  });