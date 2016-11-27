


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
  
  
  var numberOfTrainsSinceFirstTrain = ((startTime - currentTime) % frequency);
  var nexTrainTime = (frequency * numberOfTrainsSinceFirstTrain) + firstTrainTime;

  var startTime = moment(firstTrainTime, 'hh:mm a');
  var startTime = moment("12:16 am", 'hh:mm a');
  var endTime = moment("06:12 pm", 'hh:mm a');

      endTime.diff(startTime, 'minutes');




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
  		frequency: frequency,
  		dateAdded: firebase.database.ServerValue.TIMESTAMP
  	});

  	$('#inputName').val('');
    $('#inputDestination').val('');
    $('#inputFirstTime').val('');
    $('#inputFrequency').val('');

    return false;
  	});
  	//freq * the 5th train + the initial time = next train
  	database.ref().on("child_added", function(childSnapshot){
  		
  		var tableRow = $('<tr>');
  		var nameCell = $('<td>').text(childSnapshot.val().name);
  		var destinationCell = $('<td>').text(childSnapshot.val().destination);
  		var firstTrainTimeCell = $('<td>').text(childSnapshot.val().firstTrainTime);
  		var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
      var nextTrainTimeCell = $('<td>').text(childSnapshot.val().nextTrainTime);
      // moment().add(1, 'hours').diff(moment(), 'minutes')
      // moment().diff(moment(childSnapshot.val().firstTrainTime), "minutes");
  		tableRow.append(nameCell).append(destinationCell).append(frequencyCell).append(nextTrainTimeCell);

  		$('tbody').append(tableRow);
  	});



  });