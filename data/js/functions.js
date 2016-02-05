/**
 * Created by carlos on 8/01/16.
 */

console.log('Pluggin start');

//set preferences
var track_plus_image = self.options.image_url;
var track_plus_url = self.options.track_plus_url;
var track_plus_pattern = self.options.track_plus_pattern;
console.log(track_plus_pattern);
//addon
var TP_TRELLO = (function () {

    var image_url = '';
    var url = '';
    var pattern = /\d/;

    var changeUrl = function (new_url) {
        image_url = new_url;
    };

    var addClickEvent = function (card) {
        console.log('Task: ClickEvent');

        card.addEventListener('click', function () {

            var id = card.dataset.tpt_id;
            setTimeout(function () {
                TP_TRELLO.showLinkButton(id);   // <------ PETA cuando arrastras una tarjeta, lo interpreta como un click normal
            }, 500);

        }, false);

    };

    var addBox = function (card) {
        //console.log('Task: Addbox');
        //check if the card has icon.

        console.log('Task: Addbox do on ' + card.className);
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

    var replaceWithBox = function () {
        //console.log('Task: Replace');

        var cards = document.getElementsByClassName('list-card-title');
        for (var i = 0; i < cards.length; i++) {
            if ((cards[i].className.indexOf('track-plus-card') == -1) && (cards[i].innerHTML.match(pattern))) {
                addBox(cards[i]);
                addClickEvent(cards[i]);
            }
        }
        addListener();
    };

    var init = function (image, tp_url, option_pattern) {
        console.log('Task: Init');

        image_url = image;
        url = tp_url;
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

        console.log(pattern.toString());

        replaceWithBox();

        console.log('init complete');
    };

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