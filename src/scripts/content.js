
// Try to get search result to highlight
chrome.storage.local.get('curResult', function (result) {
    // if a search result is present in local storage, highlight it
    if (result != null && result.curResult) {
        highlight(result.curResult)
    } else {
        // send document text back to popup script
        chrome.runtime.sendMessage({docText: document.body.innerText});
    }
});

function highlight(text) {
    console.log(text)
    let inputText = document.body;
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}