// Initialize Firebase
var config = {
    apiKey: "AIzaSyDMHnURitUNZDJsQzis7sd6voDNEnHOLvQ",
    authDomain: "train-schedule-6a69d.firebaseapp.com",
    databaseURL: "https://train-schedule-6a69d.firebaseio.com",
    projectId: "train-schedule-6a69d",
    storageBucket: "train-schedule-6a69d.appspot.com",
    messagingSenderId: "2581607534"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();
var dataRef = firebase.database();

// Initial Values
var trainName = "";
var destination = "";
var firstTime = "";
var frequency = "";

// Capture Button Click
$("#submit").on("click", function(event) {
  event.preventDefault();

  // Grabbed values from text boxes
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#time").val().trim();
  frequency = $("#frequency").val().trim();

  // Code for handling the push
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  $("form").trigger("reset");
});

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
  // storing the snapshot.val() in a variable for convenience
  var sv = snapshot.val();

  // Console.loging the last user's data
  console.log(sv.trainName);
  console.log(sv.destination);
  console.log(sv.firstTime);
  console.log(sv.frequency);

  // Change the HTML to reflect
  $("#name-display").text(sv.trainName);
  $("#destination-display").text(sv.destination);
  $("#time-display").text(sv.firstTime);
  $("#frequency-display").text(sv.frequency);

  // Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function(childSnapshot) {

  // Log everything that's coming out of snapshot
  console.log(childSnapshot.val().trainName);
  console.log(childSnapshot.val().destination);
  console.log(childSnapshot.val().firstTime);
  console.log(childSnapshot.val().frequency);

  

// Handle the errors
}, function(errorObject) {
  console.log("Errors handled: " + errorObject.code);
});







