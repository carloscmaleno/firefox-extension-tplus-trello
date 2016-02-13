/**
 * Created by carlos on 13/02/16.
 */

// Saves options to chrome.storage
function save_options() {
    var url = document.getElementById('track_plus_url').value;
    var pattern = document.getElementById('track_plus_pattern').value;
    chrome.storage.sync.set({
        track_plus_url: url,
        track_plus_pattern: pattern
    }, function () {
        localStorage["tplus"] = { 'url' : url, 'pattern' : pattern};
        var status = document.getElementById('status');
        status.style.display = 'block';
        setTimeout(function () {
            status.style.display = 'none';
        }, 2000);
    });
}

// stored in chrome.storage.
function restore_options() {
    chrome.storage.sync.get({
        track_plus_url: '',
        track_plus_pattern: 0
    }, function (items) {
        if (items.track_plus_url)
            document.getElementById('track_plus_url').value = items.track_plus_url;
        if (items.track_plus_pattern)
            document.getElementById('track_plus_pattern').value = items.track_plus_pattern;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);