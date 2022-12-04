document.getElementById('button').addEventListener("click", query);

function query() {
    let searchQuery = document.getElementById("search").value;
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['scripts/content.js']},
            () => {
                // https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri
                chrome.storage.local.get('docText', function (items) {
                    if (items != null) {
                        runQuery(searchQuery, items.docText);
                    }
                });
            });
    });
}

async function runQuery(searchQuery, docText) {
    const  url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
    const data = {search_query: searchQuery, doc_text: docText}
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        credentials: 'omit',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}