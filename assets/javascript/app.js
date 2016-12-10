// initial setup for firebase database 
var config = {
    apiKey: "AIzaSyA7GxLKi8V3D-CBZJhTw2NazOWYoGY41l8",
    authDomain: "train-scheduler-b7e2c.firebaseapp.com",
    databaseURL: "https://train-scheduler-b7e2c.firebaseio.com",
    storageBucket: "train-scheduler-b7e2c.appspot.com",
    messagingSenderId: "1016520910023"
};
// initializing firebase
firebase.initializeApp(config);
// data shortcut
var database = firebase.database();
// name for train 
var name = "";
// destination for train
var destination = "";
// Frequency set
var frequency = 0;
// Time is 3:30 AM
var firstTrainTime = "";
// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = "";
// Current Time
var currentTime = "";
// Difference between the times
var diffTime = "";
// Time apart (remainder)
var tRemainder = "";
// Minute Until Train
var tMinutesTillTrain = "";
// Next Train
var nextTrainTime = "";
// when page first loads up...  
$(document).on('ready', function () {
    // when click on submit button 
    $('#submit').on('click', function () {
        // this checks the validity of inputs 
        if ($('.form-horizontal').get(0).checkValidity()) {
            // adds the value of name from input 
            name = $('#inputName').val().trim();
            // adds the value of destination from input 
            destination = $('#inputDestination').val().trim();
            // adds the value of Hour from input
            firstTrainHour = $('#inputHour').val();
            // adds the value of Minute from input
            firstTrainMinute = $('#inputMinute').val();
            // join Hour and Minute together 
            firstTrainTime = firstTrainHour + ":" + firstTrainMinute;
            // add the value of Frequency from input
            frequency = $('#inputFrequency').val().trim();
            // pushes the inputs to firebase in respective keys
            database.ref().push({
                name: name,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });
            // Empties all inputs of value 
            $('#inputName').val('');
            $('#inputDestination').val('');
            $('#inputHour').val('');
            $('#inputMinute').val('');
            $('#inputFrequency').val('');
            return false;
        }
    });
    // Get data for each child added 
    database.ref().on("child_added", function (childSnapshot) {
        // First Time (pushed back 1 year to make sure it comes before current time)
        var firstTimeConverted = moment(childSnapshot.val().firstTrainTime, "hh:mm").subtract(1, "years");
        // console.log(firstTimeConverted);
        // Current Time
        var currentTime = moment();
        // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
        // Difference between the times
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        // console.log("DIFFERENCE IN TIME: " + diffTime);
        // Time apart (remainder)
        var tRemainder = diffTime % childSnapshot.val().frequency;
        // console.log("TIME APART: " + tRemainder);
        // Minute Until Train
        var tMinutesTillTrain = childSnapshot.val().frequency - tRemainder;
        // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
        // Next Train
        var nextTrainTime = moment().add(tMinutesTillTrain, "minutes").format("HH:mm");
        // console.log("ARRIVAL TIME: " + moment(nextTrainTime).format("HH:mm"));
        // Dynamic table row 
        var tableRow = $('<tr>');
        // Add cell for name
        var nameCell = $('<td>').text(childSnapshot.val().name);
        // Add cell for destination 
        var destinationCell = $('<td>').text(childSnapshot.val().destination);
        // Add cell for frequency
        var frequencyCell = $('<td>').text(childSnapshot.val().frequency);
        // Add cell for firstTrainTime
        var firstTrainTimeCell = $('<td>').text(childSnapshot.val().firstTrainTime);
        // Add cell for netTrainTime
        var nextTrainTimeCell = $('<td>').text(nextTrainTime);
        // Add cell for tMinutesTillTrain
        var tMinutesTillTrainCell = $('<td>').text(tMinutesTillTrain);
        // Append cells to table row
        tableRow.append(nameCell).append(destinationCell).append(frequencyCell).append(firstTrainTimeCell).append(nextTrainTimeCell).append(tMinutesTillTrainCell);
        // Append table row to table body
        $('tbody').append(tableRow);
    });
});