/**
 * Created by carlos on 8/01/16.
 */

console.log('Pluggin start');

//set preferences
var image_url = self.options.image_url;
var track_plus_url = self.options.track_plus_url;

//addon
var TP_TRELLO = (function () {

    var image_url = '';
    var url = '';

    var changeUrl = function (new_url) {
        image_url = new_url;
    };

    var addClickEvent = function () {
        console.log('Task: ClickEvent');
        var cards = document.getElementsByClassName('list-card-title');

        for (var i = 0; i < cards.length; i++) {
            cards[i].addEventListener('click', function () {
                id = this.dataset.tpt_id;

                console.log(id);
                setTimeout(function () {
                    TP_TRELLO.showLinkButton(id)   // <------ PETA cuando arrastras una tarjeta, lo interpreta como un click normal
                }, 500);

            }, false);
        }
    };

    var addBox = function (card) {
        console.log('Task: Addbox');
        //check if the card has icon.

        element = card.innerHTML.match(/#[0-9]+#/);

        if (element != null) {
            console.log('Task: Addbox do on '+card.className);
            id = element.toString().replace('#', '');

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
            card.className += ' track-plus-card'
        }
    };

    var replaceWithBox = function () {
        console.log('Task: Replace');

        var cards = document.getElementsByClassName('list-card-title');
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].className.indexOf('track-plus-card') == -1) {
                addBox(cards[i]);
            }
        }
        addClickEvent();
        addListerer();
    };

    var init = function (image, tp_url) {
        console.log('Task: Init');

        image_url = image;
        url = tp_url;
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

    var addListerer = function () {
        console.log('Task: Listener');

        setTimeout(function(){
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
        TP_TRELLO.init(image_url, track_plus_url);
    }
}