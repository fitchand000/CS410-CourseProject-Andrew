// listen for messages sent from background.js
chrome.storage.local.set({
    docText: document.body.innerText
}).then(() => console.log("text is set"));



function highlight(text) {
    let inputText = document.body;
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}