//Import the self-mod API
var data = require("sdk/self").data;

// Import the page-mod API
var pageMod = require("sdk/page-mod");


// Create a page-mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
    include: "https://trello.com/b/*",
    contentScriptFile: [
        data.url("./js/jquery-1.12.0.min.js"),
        data.url("./js/functions.js")
    ],
    contentStyleFile: data.url('./css/style.css'),
    onAttach: function (worker) {

        worker.port.emit("getImageIcon", data.url('./img/icon_badge.ico'));
    }

});