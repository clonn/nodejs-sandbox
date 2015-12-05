var Youtube = require("youtube-api"),
  Fs = require("fs"),
  ReadJson = require("r-json"),
  Lien = require("lien"),
  Logger = require("bug-killer"),
  Opn = require("opn");

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
  refresh_token: "4/yHp70vt3a-nS9WdLb-BjEgTphTTs8yg0gLcCf86Ju5g",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0]
});
// 4/Yk96JR_JXu452zdEPZgyOYXGMxWp_ekuSzfIJJ4vYDs

Opn(oauth.generateAuthUrl({
  access_type: "offline",
  scope: ["https://www.googleapis.com/auth/youtube", "https://www.googleapis.com/auth/youtube.upload"],
  approval_prompt : 'force'
}));

// Handle oauth2 callback
server.page.add("/oauth2callback", function(lien) {
  Logger.log("Trying to get the token using the following code: " + lien.search.code);
  oauth.getToken(lien.search.code, function(err, tokens) {
    if (err) {
      lien(err, 400);
      Logger.log("tokens ============: " + tokens);
      return Logger.log(err);
    }
    oauth.setCredentials(tokens);
    lien.end(tokens);
  });
});
