var moviePosters = [];
// Get the hash of the url
const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce(function (initial, item) {
        if (item) {
            var parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
    }, {});
window.location.hash = '';

// Set token
let _token = hash.access_token;

const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
const clientId = '80f8fbcd74a24b8ea1d6aab4c74ead38';
const redirectUri = 'https://egretsch.github.io/project1/';
const scopes = [
    'user-top-read'
];
// &scope=${scopes.join('%20')}&show_dialog=true
// If there is no token, redirect to Spotify authorization
if (!_token) {
    window.location = `${authEndpoint}?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}`;
}