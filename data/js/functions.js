/**
 * Created by carlos on 8/01/16.
 */

//set preferences
var image_url = self.options.image_url;
var track_plus_url = self.options.track_plus_url;

//addon
var TP_TRELLO = (function ($) {

    var image_url = '';
    var url = '';

    var changeUrl = function(new_url){
        image_url = new_url;
    };

    var replaceWithBox = function () {

        var cards = [];
        $('.list-card-title').each(function () {
            element = $(this).text().match(/#[0-9]+\s/);
            if (element != null) {
                id = element.toString().replace('#', '');
                cards.push(id);
                $(this).parent().find(".badges").append('<div class="badge is-icon-only tpt-badge">' +
                    '<a target="_blank" href="' + url + id + '">' +
                    '<img src="' + image_url + '" title="Go to Track+" /></a></div>');

                $(this).data("tpt_id", id);
            }
        });
    };

    var init = function (image, tp_url) {
        image_url = image;
        url = tp_url;
        replaceWithBox();
    };

    var showLinkButton = function (id) {
        $('div.window-sidebar div.window-module:first-child div').prepend('<a href="' + url + id + '" class="button-link"><img src="' + image_url + '"/> Track+</a>')
    };

    // ==================
    // PUBLIC METHODS
    // ==================
    return {
        init: init,
        showLinkButton: showLinkButton,
        changeUrl : changeUrl
    }
})($);

//------------
$(document).ready(function () {

    console.log('run');
    TP_TRELLO.init(image_url, track_plus_url);


    $('.list-card-title').click(function () {
        id = $(this).data("tpt_id");
        setTimeout(function () {
            TP_TRELLO.showLinkButton(id)
        }, 250);
    });
});



