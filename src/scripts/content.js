
// Try to get search result to highlight
chrome.storage.local.get('curResult', function (result) {

    // run the search query and enable
    if (result != null && result.curResult) {
        highlight(result.curResult)
    } else {
        // put the document text in local storage
        chrome.storage.local.set({
            docText: document.body.innerText
        }).then(() => console.log("text is set"));
    }
});

function highlight(text) {
    console.log("about to highlight: ")
    console.log(text)
    let inputText = document.body;
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}