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
  refresh_token: "1/GpkAQwgA-MWuuRpkOqp0gCihfYS-EhQ9eq1gCcHPCOtIgOrJDtdun6zK6XiATCKT",
  client_id: CREDENTIALS.web.client_id,
  client_secret: CREDENTIALS.web.client_secret,
  redirect_url: CREDENTIALS.web.redirect_uris[0],
  platform: 'youtube'
});

oauth.refreshAccessToken(function(err, result, response){
  if (err) {
    return Logger.log(err);
  }
  // refreshToken can map userplatform
  console.log('response:%j', response);
  console.log("tokens: %j", result);
  oauth.setCredentials(result);
  process.exit(0)
})

console.log('stop here...');
