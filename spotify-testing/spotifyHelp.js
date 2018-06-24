<!DOCTYPE html>
<html>

<head>
    <title>Spotify</title>
</head>

<body>
    <h1>Spotify</h1>
    <h2>Open your console log</h2>

    <script src="https://sdk.scdn.co/spotify-player.js"></script>
    <script>
        window.onSpotifyWebPlaybackSDKReady = () => {
            const token = 'BQAmCrnTqU-p62eq8XncNIH_SDwJL3JKSw_n8pshHVvSXJmCuLNJo6a_D2EPEX5P2vTGbJpy2YPw6dIfcVzU8PkowLxA1owQKCcx3kvp4DqTJXYH8gG-4LBlItiV1GXa8Rgn0G5OzpAezHZvJNGWfdXok1y89KscHzg1';
            const player = new Spotify.Player({
                name: 'Web Playback SDK Quick Start Player',
                getOAuthToken: cb => { cb(token); }
            });

            // Error handling
            player.addListener('initialization_error', ({ message }) => { console.error(message); });
            player.addListener('authentication_error', ({ message }) => { console.error(message); });
            player.addListener('account_error', ({ message }) => { console.error(message); });
            player.addListener('playback_error', ({ message }) => { console.error(message); });

            // Playback status updates
            player.addListener('player_state_changed', state => { console.log(state); });

            // Ready
            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            // Not Ready
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            // Connect to the player!
            player.connect().then(success => {
                if (success) {
                    console.log('The Web Playback SDK successfully connected to Spotify!');
                }
            })

            // Below should control music playing on page
            const play = ({
                spotify_uri,
                playerInstance: {
                    _options: {
                        getOAuthToken,
                        id
                    }
                }
            }) => {
                getOAuthToken(access_token => {
                    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${id}`, {
                        method: 'PUT',
                        body: JSON.stringify({ uris: [spotify_uri] }),
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`
                        },
                    });
                });
            };

            play({
                playerInstance: new Spotify.Player({ name: "..." }),
                spotify_uri: 'spotify:track:7xGfFoTpQ2E7fRF5lN10tr',
            });
        };
    </script>
</body>

</html>




$(document).on("click", ".moviePoster", function () {
    $('#player').empty();
    var token = "";
    var musicG = $(this).attr("data-music");
    var musicUrl = 'https://api.spotify.com/v1/search?q=' + musicG + '&type=playlist'
   $.ajax({
    url: musicUrl,
    method: 'GET',
    headers: {
        'Authorization': 'Bearer ' + token
    },      
    success: function (playlist) {
        console.log(playlist);
        var randomMusic = playlist.playlists.items[Math.floor(Math.random() * playlist.playlists.items.length)].uri;
        console.log(randomMusic);
        var musicDiv = $("<div>");
        var musicIframe = $('<iframe src="https://open.spotify.com/embed?uri=' + randomMusic + '" width="300" height="300" frameborder="0" allowtransparency="true" allow="encrypted-media">' + '</iframe>');
        $("#player").append(musicDiv);
        musicDiv.append(musicIframe);
    },
    error: function () {
        console.log("It failed");
    }
    }); 
});