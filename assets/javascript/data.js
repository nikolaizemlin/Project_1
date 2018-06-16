

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

// Initial Values
var fname = "";
var lname = "";
var email = "";
var password = "";

// Capture Button Click
$("#add-person").on("click", function() {

  fname = $("#fname-input").val().trim();
  lname = $("#lname-input").val().trim();
  email = $("#email-input").val().trim();
  password = $("#password-input").val().trim();

  // Push
  dataRef.ref().push({

    fname: fname,
    lname: lname,
    email: email,
    password: password,
  
  )}; 
  console.log(add-person);
    // clear text
$("#fname-input").val("");
$("#lname-input").val("");
$("#email-input").val("");
$("#password-input").val("");

   // No refresh
  return false;
 
  )}; 

