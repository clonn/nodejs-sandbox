var Youtube = require("youtube-api"),
  Fs = require("fs"),
  ReadJson = require("r-json"),
  Lien = require("lien"),
  Logger = require("bug-killer"),
  Opn = require("opn");

  var google = require('googleapis');
  var urlshortener = google.urlshortener('v1');

// Constants
// I downloaded the file from OAuth2 -> Download JSON
const CREDENTIALS = ReadJson("./google-api-credentials.json");

// Init lien server
var server = new Lien({
  host: "localhost",
  port: 5000
});

// Authenticate
// You can access the Youtube resources via OAuth2 only.
// https://developers.google.com/youtube/v3/guides/moving_to_oauth#service_accounts
var oauth = Youtube.authenticate({
  type: "oauth",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0]
});

//  4/EzT1wh1G3xMPKsP2whRGpuke77TyE1NiWaUB6PbqSR0
var url = oauth.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.upload"],
  response_type : "code"
})
console.log('url:' + url);

// https://accounts.google.com/o/oauth2/auth?access_type=offline&

Opn(oauth.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.upload"],
  approval_prompt : 'force'
}));

// Handle oauth2 callback
server.page.add("/oauth2callback", function(lien) {
  Logger.log("code: " + lien.search.code);
  oauth.opts.tokenUrl = "https://www.googleapis.com/oauth2/v3/token";

  oauth.getToken(lien.search.code, function(err, tokens) {
    if (err) {
      lien(err, 400);
      Logger.log("tokens ============: " + tokens);
      return Logger.log(err);
    }
    oauth.setCredentials(tokens);

    // GET https://www.googleapis.com/youtube/v3/channels?part=contentDetails&mine=true&key={YOUR_API_KEY}
    // get User Info
    Youtube.channels.list({
      part: "contentDetails",
      mine: "true"
      }, function(err, data){
        if (err) { return lien.end(err, 400); }
        // console.log("channelId: " + data.items[0].id)
        lien.end(data);
    });

    // https://developers.google.com/youtube/v3/docs/playlists/list
    // https://www.youtube.com/playlist?list=UUpQ79vMafvLmg-WYHW0nF_Q
    // get user upload playlist items info
    // Youtube.playlistItems.list({
    //   part: 'snippet',
    //   playlistId: 'UUpQ79vMafvLmg-WYHW0nF_Q',
    //   maxResults: 50
    // }, function(err, data) {
    //   if (err) {
    //     return lien.end(err, 400);
    //   }
    //   // console.log("channelId: " + data.items[0].id)
    //   lien.end(data);
    // });

  });
});
