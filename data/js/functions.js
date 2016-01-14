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
                    TP_TRELLO.showLinkButton(id)
                }, 500);

            }, false);
        }
    };

    var replaceWithBox = function () {
        console.log('Task: Replace');

        var cards = document.getElementsByClassName('list-card-title');
        for (var i = 0; i < cards.length; i++) {
            element = cards[i].innerHTML.match(/#[0-9]+#/);

            if (element != null) {
                id = element.toString().replace('#', '');

                var node = document.createElement("div");
                node.className = 'badge is-icon-only tpt-badge';

                var a = document.createElement("a");
                a.setAttribute("target", "_blank")
                a.setAttribute("href", url + id);

                var img = document.createElement("img");
                img.setAttribute("src", image_url);
                img.setAttribute("title", "Go to Track+");

                a.appendChild(img);
                node.appendChild(a);
                cards[i].parentElement.getElementsByClassName("badges")[0].appendChild(node);

                cards[i].dataset.tpt_id = id;
            }
        }
        addClickEvent();
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
        setTimeout(autoload(), 250);
    } else {
        console.log('Start');
        TP_TRELLO.init(image_url, track_plus_url);
    }
}