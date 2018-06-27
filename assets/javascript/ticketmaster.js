$("#artist-body").hide();

//change this to start on search click
$("#run-search").on("click", function(event) {
  event.preventDefault();

  $("#artist-body").show();

  //clear the div
  $("#article-section").empty();

  //hello

  //change this to capture user entry in search
  var artist = $("#search-term")
    .val()
    .trim();

  $("#artist-name").text("Upcoming Shows");
  // $("#spotify-title").text("Listen on Spotify");

  var queryURL =
    "https://app.ticketmaster.com/discovery/v1/events.json?keyword=" +
    artist +
    "&apikey=GEqhJFCV9Y6TonOIwSahrRaPtQ3VnFGK&callback=myFunction";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    if (response.page.totalElements !== 0) {
      for (i = 0; i < 5; i++) {
        var eventDiv = $("<div class='item'>");

        var eventTitle = response._embedded.events[i].name;
        var eventName = response._embedded.events[i]._embedded.venue[0].name;
        var eventDate =
          response._embedded.events[i].dates.displayOptions.range.localEndDate;
        var address =
          response._embedded.events[i]._embedded.venue[0].address.line2;
        var eventUrl = response._embedded.events[i].eventUrl;

        var eventTitleText = $("<h4>").text(eventTitle);
        var eventNameText = $("<p>").text(eventName);
        var eventDateText = $("<p>").text(eventDate);
        var addressText = $("<p>").text(address);
        //var save = $("<button>").text(" save to my shows");

        if (response._embedded.events[i].eventUrl === undefined) {
          var newLink = $(
            "<a href='https://www.ticketmaster.com/'>Click for Ticket Master!</a>"
          );
        } else {
          var newLink = $("<a />", {
            name: "link",
            href: eventUrl,
            text: "Click for " + artist + " tickets!"
          });
        }

        //  eventDiv.prepend(save);

        eventDiv.prepend(newLink);
        eventDiv.prepend(eventDateText);
        eventDiv.prepend(addressText);
        eventDiv.prepend(eventNameText);
        eventDiv.prepend(eventTitleText);
        $("#article-section").prepend(eventDiv);
        $("#article-section").append("<br>");
      }
    } else {
      var eventDiv = $("<div class='item'>");
      var artistName = $("<p>").text(artist);
      var noShows = $("<p>").text(" has no upcoming shows");
      eventDiv.append(artistName);
      eventDiv.append(noShows);
      $("#article-section").prepend(eventDiv);
    }
  });
});
