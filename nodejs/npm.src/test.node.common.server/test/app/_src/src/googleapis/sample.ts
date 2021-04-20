import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

import { appConsole } from "../../src.common/logging/appConsole.js";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/contacts.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "./src/googleapis/token.json";

// Load client secrets from a local file.
fs.readFile("./src/googleapis/credentials.json", (err, content) => {
  if (err) return appConsole.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Google Tasks API.
  authorize(JSON.parse(content.toString("utf8")), listConnectionNames);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
const authorize = (credentials, callback) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token.toString("utf8")));
    callback(oAuth2Client);
  });
};

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
const getNewToken = (oAuth2Client, callback) => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  appConsole.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return appConsole.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return appConsole.error(err);
        appConsole.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
};

/**
 * Print the display name if available for 10 connections.
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
const listConnectionNames = (auth) => {
  const service = google.people({ version: "v1", auth });
  service.people.connections.list(
    {
      resourceName: "people/me",
      pageSize: 10,
      personFields: "names,emailAddresses",
    },
    (err, res) => {
      if (err) return console.error("The API returned an error: " + err);
      const connections = res?.data.connections;
      if (connections) {
        appConsole.log("Connections:");
        connections.forEach((person) => {
          if (person.names && person.names.length > 0) {
            appConsole.log(person.names[0].displayName);
          } else {
            appConsole.log("No display name found for connection.");
          }
        });
      } else {
        appConsole.log("No connections found.");
      }
    }
  );
};

export const startOAuth = async () => {};
