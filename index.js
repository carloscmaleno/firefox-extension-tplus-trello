//Import the self-mod API
var self = require("sdk/self");
var data = self.data;

// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Get Preferences
var preferences = require("sdk/simple-prefs").prefs;

// Check new version
var ss = require("sdk/simple-storage");
var last_version = ss.storage.last_version;
var new_version = false;

if ((last_version == undefined) || (last_version < self.version)) {
    ss.storage.last_version = self.version;
    new_version = true;
}

// Create a page-mod
pageMod.PageMod({
    include: ["https://trello.com/*", 'http://localhost/*'],
    contentScriptFile: [
        data.url("js/functions.js")
    ],
    contentStyleFile: [
        data.url("css/style.css")
    ],
    contentScriptOptions: {
        image_url: data.url('./img/icon_badge.ico'),
        track_plus_url: preferences.track_plus_url,
        track_plus_pattern: preferences.track_plus_pattern,
        track_plus_new_version: new_version
    }
});