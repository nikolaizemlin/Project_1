// Empty source for spotify player
$("#spotify").attr("src", " ");

// Gets the hash of the URL (used for authentication)
const hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function(initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});
window.location.hash = "";

// Sets token
let _token = hash.access_token;

// variables for URL to get token
const authEndpoint = "https://accounts.spotify.com/authorize";
const clientId = "f2e2d50aac134850a09128c2646b8c0a";
const redirectUri = "https://nikolaizemlin.github.io/Project_1/main.html";
const scopes = ["user-top-read"];

// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
};

// Waits for SDK to be ready
window.onSpotifyWebPlaybackSDKReady = () => {
  // Runs function once search is clicked
  $("#run-search").on("click", function(event) {
    event.preventDefault();

    // Trims the search input and stores input as variable
    var artist = $("#search-term")
      .val()
      .trim();
    //console.log("This is the artist: " + artist);
    var artistQuery =
      "https://api.spotify.com/v1/search?query=" +
      artist +
      "&limit=1&type=artist";
    // performs AJAX request
    $.ajax({
      url: artistQuery,
      method: "GET",
      headers: {
        Authorization: "Bearer " + _token
      },
      success: function(response) {
        //console.log(response);
        //console.log(response.artists.items[0].id);

        // Gathers artist ID & creates an embedded player using that information
        var artistId = response.artists.items[0].id;
        var source =
          "https://open.spotify.com/embed?uri=spotify:artist:" + artistId;

        $("#spotify").attr("src", source);
        //console.log(source);
      },
      error: function() {
        console.log("Error with ajax GET for Spotify");
      }
    });

    // Clears the search text after search (makes sure this script is loaded last)
    $("#search-term").val("");
  });
};
