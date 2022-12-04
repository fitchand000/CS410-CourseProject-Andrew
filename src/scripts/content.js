chrome.storage.local.get('searchQuery', function (items) {
    let searchQuery = items.search;
    console.log(searchQuery);
    console.log(document.body.innerText)
});

function highlight(text) {
    let inputText = document.body
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0,index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}