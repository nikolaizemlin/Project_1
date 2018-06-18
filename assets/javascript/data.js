

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
var FirstName = "";
var LastName = "";
var Email = "";
var Password = "";
var ZipCode = "";

// Capture Button Click
$("#add-person").on("click", function() {

FirstName = $("#fname-input").val().trim();
LastName = $("#lname-input").val().trim();
Email = $("#email-input").val().trim();
Password = $("#password-input").val().trim();
ZipCode = $("#zipcode-input").val().trim();

console.log("fname-input");
console.log("lname-input");
console.log("password-input");

	// Push
  dataRef.ref().push({

    FirstName: FirstName,
    LastName: LastName,
    Email: Email,
    Password: Password,
    ZipCode: ZipCode,
    // dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

// console.log successful add
console.log("fname added");

// clear text
$("#fname-input").val("");
$("#lname-input").val("");
$("#email-input").val("");
$("#password-input").val("");
$("#zipcode-input").val("");

   // No refresh
  return false;
  });



