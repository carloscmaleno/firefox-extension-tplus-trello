/**
 * Created by carlos on 8/01/16.
 */

console.log('Pluggin start');

//set preferences
var track_plus_image = self.options.image_url;
var track_plus_url = self.options.track_plus_url;
var track_plus_pattern = self.options.track_plus_pattern;


//addon
var TP_TRELLO = (function () {

    /** @var Link to image */
    var image_url = '';

    /** @var URL to Track+ */
    var url = '';

    /** @var Pattern to find Track+'s numbers */
    var pattern = /\d/;

    /** @var Indicate Pattern option*/
    var pattern_option = 0;

    /**
     * Change URL to Track+
     * @param new_url
     */
    var changeUrl = function (new_url) {
        image_url = new_url;
    };

    /**
     * Attach event when click on a Card to show Pop-up
     * @param card
     */
    var addClickEvent = function (card) {
        console.log('Task: ClickEvent');

        card.addEventListener('click', function () {

            var id = card.dataset.tpt_id;
            setTimeout(function () {
                TP_TRELLO.showLinkButton(id);   // <------ PETA cuando arrastras una tarjeta, lo interpreta como un click normal
            }, 500);

        }, false);

    };

    /**
     * Add Track+'s Icon on a title Card
     * @param card
     */
    var addBox = function (card) {
        //console.log('Task: Addbox');

        var id = card.toString().replace('#', '');
        id = id.replace('#', '');

        var node = document.createElement("div");
        node.className = 'badge is-icon-only tpt-badge';

        var a = document.createElement("a");
        a.setAttribute("target", "_blank");
        a.setAttribute("href", url + id);

        var img = document.createElement("img");
        img.setAttribute("src", image_url);
        img.setAttribute("title", "Go to Track+");

        a.appendChild(img);
        node.appendChild(a);
        card.parentElement.getElementsByClassName("badges")[0].appendChild(node);

        card.dataset.tpt_id = id;
        card.className += ' track-plus-card';
    };

    /**
     * Find all cards and add icon + click event.
     */
    var replaceWithBox = function () {
        //console.log('Task: Replace');

        var cards = document.getElementsByClassName('list-card-title');

        for (var i = 0; i < cards.length; i++) {
            var text = cards[i].innerHTML;
            var span_remove = cards[i].getElementsByTagName('span')[0].innerHTML;
            text = text.replace(span_remove, "");

            if ((cards[i].className.indexOf('track-plus-card') == -1) && (text.match(pattern))) {
                addBox(cards[i]);
                addClickEvent(cards[i]);
            }
        }
        addListener();
    };

    /**
     * INIT Application
     * @param image
     * @param tp_url
     * @param option_pattern
     */
    var init = function (image, tp_url, option_pattern) {
        console.log('Task: Init');

        image_url = image;
        url = tp_url;
        pattern_option = option_pattern;

        switch (option_pattern) {

            case 1:
                pattern = /(#[0-9]+\s)|(#[0-9]+(\s)?$)/;
                break;
            case 2:
                pattern = /#[0-9]+#/;
                break;

            default:
                pattern = /\d{2,}/;
                break;
        }

        replaceWithBox();

        console.log('init complete');
    };

    /**
     * Show button in Pop-up to go Track+ when click on a Card
     * @param id
     */
    var showLinkButton = function (id) {
        console.log('Task: showLink');

        var img = document.createElement("img");
        img.setAttribute("src", image_url);

        var a = document.createElement("a");
        a.className = 'button-link';
        a.setAttribute("target", "_blank");
        a.setAttribute("href", url + id);
        a.appendChild(img);
        a.appendChild(document.createTextNode("  Track+"));


        document.getElementsByClassName('window-sidebar')[0]
            .getElementsByClassName('window-module')[0]
            .getElementsByTagName("div")[0]
            .appendChild(a);
    };

    /**
     * Waiting to new cards for add Icon
     */
    var addListener = function () {
        console.log('Task: Listener');

        setTimeout(function () {
            replaceWithBox();
        }, 2000);
    };

    // ==================
    // PUBLIC METHODS
    // ==================
    return {
        init: init,
        showLinkButton: showLinkButton,
        changeUrl: changeUrl
    }
})();


//------------ INIT
autoload();

function autoload() {
    var cards = document.getElementsByClassName('list-card-title');
    if (cards.length == 0) {
        console.log('Wait');
        setTimeout(autoload(), 500);
    } else {
        console.log('Start');
        TP_TRELLO.init(track_plus_image, track_plus_url, track_plus_pattern);
    }
}