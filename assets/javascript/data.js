

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDXEMDXUtKYjOJoZoIwF-ZbKbg_yROcGUs",
  authDomain: "project1-4b843.firebaseapp.com",
  databaseURL: "https://project1-4b843.firebaseio.com",
  projectId: "project1-4b843",
  storageBucket: "project1-4b843.appspot.com",
  messagingSenderId: "612612974443"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Create a variable to reference the database.
var database = firebase.database();

// Initial Values
var name = "";
var last = "";
var email = "";
var zipcode = "";

// Capture Button Click
$("#add-person").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name-input").val().trim();
  last = $("#last-input").val().trim();
  email = $("#email-input").val().trim();
  zipcode = $("#zipcode-input").val().trim();
  // Code for handling the push
  database.ref().push({
    name: name,
    email: email,
    last: last,
    zipcode: zipcode,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // clear text
  $("#name-input").val("");
  $("#last-input").val("");
  $("#email-input").val("");
  $("#zipcode-input").val("");
});





