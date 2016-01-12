/**
 * Created by carlos on 8/01/16.
 */

var TP_TRELLO = (function ($) {

    var image_url = '';
    var url = 'http://trackplus.laviniainteractiva.com/track/printItem.action?key=';

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

    var init = function (image) {
        image_url = image;
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
        showLinkButton: showLinkButton
    }
})($);

//------------
$(document).ready(function () {

    console.log('run');

    self.port.on("getImageIcon", function (image) {
        TP_TRELLO.init(image);
    });


    $('.list-card-title').click(function () {
        id = $(this).data("tpt_id");
        setTimeout(function () {
            TP_TRELLO.showLinkButton(id)
        }, 250);
    });
});



