document.getElementById('button').addEventListener("click", query);

function query() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        let searchQuery = document.getElementById("search").value;
        chrome.storage.local.set({
            searchQuery: searchQuery
        }, function () {
            chrome.scripting.executeScript(
                {target: {tabId: tabs[0].id}, files: ['scripts/content.js']},
                () => chrome.runtime.lastError
            );
        });
    });
}