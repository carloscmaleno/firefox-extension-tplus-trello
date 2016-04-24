//Import the self-mod API
var data = require("sdk/self").data;

// Import the page-mod API
var pageMod = require("sdk/page-mod");

// Get Preferences
var preferences = require("sdk/simple-prefs").prefs;

// Create a page-mod
pageMod.PageMod({
    include: ["https://trello.com/b/*", 'http://localhost/*'],
    contentScriptFile: [
        data.url("js/functions.js")
    ],
    contentStyleFile: [
        data.url("css/style.css")
    ],
    contentScriptOptions: {
        image_url: data.url('./img/icon_badge.ico'),
        track_plus_url: preferences.track_plus_url,
        track_plus_pattern : preferences.track_plus_pattern
    }
});

console.log('Pluggin Load');