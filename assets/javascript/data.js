$(function() {
  $('.intro').addClass('go');

  $('.reload').click(function() {
    $('.intro').removeClass('go').delay(200).queue(function(next) {
      $('.intro').addClass('go');
      next();
    });

  });
})
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
var password = "";
var zipcode = "";

// Capture Button Click
$("#add-person").on("click", function (event) {
  event.preventDefault();

  // Grabbed values from text boxes
  name = $("#name-input").val().trim();
  last = $("#last-input").val().trim();
  email = $("#email-input").val().trim();
  password = $("#password-input").val().trim();
  zipcode = $("#zipcode-input").val().trim();
  // Code for handling the push
  database.ref().push({
    name: name,
    email: email,
    last: last,
    password: password,
    zipcode: zipcode,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  // clear text
  $("#name-input").val("");
  $("#last-input").val("");
  $("#email-input").val("");
  $("#password-input").val("");
  $("#zipcode-input").val("");
});

var frmvalidator = new Validator("mainform");
frmvalidator.addValidation("name","req","Please enter your First Name");
frmvalidator.addValidation("name","maxlen=20",
       "Max length for name is 20");

frmvalidator.addValidation("last","req");
frmvalidator.addValidation("last","maxlen=20");

frmvalidator.addValidation("email","maxlen=50");
frmvalidator.addValidation("email","req");
frmvalidator.addValidation("email","email");

frmvalidator.addValidation("zipcode","maxlen=5");
frmvalidator.addValidation("zipcode","numeric");

frmvalidator.addValidation("password","maxlen=50");
frmvalidator.addValidation("password","neelmnt=name",
"The password should not be same as username");





