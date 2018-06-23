const http = require('http');
const { parse } = require('querystring');
const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        collectRequestData(req, result => {
            console.log(result);
            res.end(`Parsed data belonging to ${result.fname}`);
        });
    } 
    else {
        res.end(`
            <!doctype html>
            <html>
            <body>
                <form action="/" method="post">
                    <input type="text" name="fname" /><br />
                    <input type="number" name="age" /><br />
                    <input type="file" name="photo" /><br />
                    <button>Save</button>
                </form>
            </body>
            </html>
        `);
    }
});
server.listen(3000);

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }

}


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
      for (let i = 0; i < body.tracks.length; i++) {
        // console.log('THis is a thing');
        console.log(body.tracks[i].href);
      }
      
        console.log(body.tracks[0].href);


        // TO DO 

        // research how to send information from request on node docs
      // wrap in get request 
      // res send body
    });
  }
});