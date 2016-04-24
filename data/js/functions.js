/**
 * Created by carlos on 8/01/16.
 */

console.log('Pluggin start');

//set preferences
var track_plus_image = self.options.image_url;
var track_plus_url = self.options.track_plus_url;
var track_plus_pattern = self.options.track_plus_pattern;
var debug = false;


var TP_TRELLO_SETTINGS = (function () {

    var NUMBER_START_WITH = /(#[0-9]+\s)|(#[0-9]+(\s)?$)/;
    var NUMBER_START_END_WITH = /#[0-9]+#/;
    var NUMBER_ALL = /\d{2,}(?!\d*\))/;

    var getExpression = function (option) {

        switch (option) {
            case 1:
                pattern = NUMBER_START_WITH;
                break;
            case 2:
                pattern = NUMBER_START_END_WITH;
                break;

            default:
                pattern = NUMBER_ALL;
                break;
        }

        return pattern;
    };

    var getAllExpression = function () {
        return {
            0: NUMBER_ALL,
            1: NUMBER_START_WITH,
            2: NUMBER_START_END_WITH
        };
    };

    // ==================
    // PUBLIC METHODS
    // ==================
    return {
        getExpression: getExpression,
        getAllExpression: getAllExpression
    }
})();

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
        if (debug)
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
     * @param id Track+ ID
     */
    var addBox = function (card, id) {
        if (debug)
            console.log('Task: Addbox');

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
        if (debug)
            console.log('Task: Replace');

        var cards = document.getElementsByClassName('list-card-title');
        var are_new = false;

        for (var i = 0; i < cards.length; i++) {
            var text = cards[i].innerHTML;
            var span_remove = cards[i].getElementsByClassName('card-short-id');

            //remove text: Nº xxx
            if (span_remove.length > 0) { //skip if are new
                text = text.replace(span_remove[0].innerHTML, "");
            }

            if ((cards[i].className.indexOf('track-plus-card') == -1) && (text.match(pattern))) {
                var id = pattern.exec(text)[0];
                id = id.replace('#', '');
                id = id.replace('#', '');
                addBox(cards[i], id);
                addClickEvent(cards[i]);

                are_new = true;
            }
        }

        if (are_new) {
            addLabelCountCards();
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
        if (debug)
            console.log('Task: Init');

        image_url = image;
        url = tp_url;
        pattern_option = option_pattern;

        pattern = TP_TRELLO_SETTINGS.getExpression(option_pattern);

        addStatus();
        replaceWithBox();

        if (debug)
            console.log('init complete');
    };

    /**
     * Show button in Pop-up to go Track+ when click on a Card
     * @param id
     */
    var showLinkButton = function (id) {
        if (debug)
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
        if (debug)
            console.log('Task: Listener');

        setTimeout(function () {
            replaceWithBox();
        }, 2000);
    };

    /**
     * Add status icon + link to your Track+
     */
    var addStatus = function () {
        var toolbar = document.getElementsByClassName('board-header-btns')[0];
        var regexp = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\?]+)/igm;

        var img = document.createElement("img");
        img.setAttribute("src", image_url);
        img.setAttribute('title', 'Track+ active');
        img.setAttribute('height', '14');
        img.className = 'board-header-btn-icon icon-sm';

        var a = document.createElement("a");
        a.className = 'board-header-btn';
        a.setAttribute("target", "_blank");
        if (url.match(regexp)) {
            a.setAttribute("href", regexp.exec(url)[0]);
        }

        a.appendChild(img);
        toolbar.appendChild(a);
    };

    var addLabelCountCards = function () {

        if (debug)
            console.log('Task: LabelCount');

        var list = document.getElementsByClassName('list');
        for (var key = 0; key < list.length; key++) {
            var cards_count = list[key].getElementsByClassName('track-plus-card');
            var title = list[key].getElementsByClassName('list-header-extras')[0];
            var counter = list[key].getElementsByClassName('track-plus-counter');

            if (counter.length > 0) {
                counter[0].innerHTML = cards_count.length;

            } else {
                var span = document.createElement('span');
                span.className = 'list-header-extras-subscribe red track-plus-counter';
                span.appendChild(document.createTextNode(cards_count.length));

                title.appendChild(span);
            }
        }


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
        if (debug)
            console.log('Wait');
        setTimeout(function () {
            autoload();
        }, 500);
    } else {
        if (debug)
            console.log('Start');
        TP_TRELLO.init(track_plus_image, track_plus_url, track_plus_pattern);
    }
}