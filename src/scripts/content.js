// Try to get search result to highlight
chrome.storage.local.get('curResult', function (result) {
    // if a search result is present in local storage, highlight it
    if (result != null && result.curResult) {
        window.find(result.curResult, false, false, true)
    } else {
        // send document text back to popup script
        chrome.runtime.sendMessage({docText: document.body.innerText});
    }
});