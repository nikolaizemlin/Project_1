var request = require('request'); // "Request" library

var client_id = 'f2e2d50aac134850a09128c2646b8c0a'; 
var client_secret = '5269bf9733e543a988f4917ccd4ed15a'; 

// your application requests authorization
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {

    // use the access token to access the Spotify Web API
    var token = body.access_token;
    var options = {
      url: 'https://api.spotify.com/v1/artists/26VFTg2z8YR0cCuwLzESi2/top-tracks?country=US',
      headers: {
        'Authorization': 'Bearer ' + token
      },
      json: true
    };
    console.log(options);
    request.get(options, function(error, response, body) {
      console.log(body);

      // wrap in get request 
      // res send body
    });
  }
});