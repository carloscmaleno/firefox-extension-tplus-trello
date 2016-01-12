/**
 * Created by carlos on 8/01/16.
 */

var TP_TRELLO = (function ($) {

    var replaceWithBox = function (image_url) {

        var cards = [];
        $('.list-card-title').each(function () {
            element = $(this).text().match(/#[0-9]+\s/);
            if (element != null) {
                id = element.toString().replace('#', '');
                cards.push(id);
                $(this).parent().find(".badges").append('<div class="badge is-icon-only tpt-badge">' +
                    '<a target="_blank" href="http://trackplus.laviniainteractiva.com/track/printItem.action?key=' + id + '">' +
                    '<img src="'+image_url+'" title="Go to Track+" /></a></div>');
            }
        });
    };

    var init = function (image) {
        replaceWithBox(image);
    };

    // ==================
    // PUBLIC METHODS
    // ==================
    return {
        init: init
    }
})($);


var tpt_getIcon = '';
self.port.on("getImageIcon", function(image) {
    TP_TRELLO.init(image);
});


