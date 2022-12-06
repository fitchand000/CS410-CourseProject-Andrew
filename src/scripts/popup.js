// initialize variables for iterating over search results
let searchResults = [];
let index = -1;
let searchQuery = null;

// add listeners to all buttons
document.getElementById('button').addEventListener("click", query);
document.getElementById('next').addEventListener("click", nextResult);
document.getElementById('prev').addEventListener("click", prevResult);

/**
 * Dispatch a search query and document text to a google cloud function that
 * computes the BM25 ranking function and returns the top 5 results
 *
 * @param searchQuery user's query as a string
 * @param docText all text in the body of the active webpage
 * @returns {Promise<any>} the BM25 ranking with the top 5 results
 */
async function runQuery(searchQuery, docText) {
    const  url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
    const data = {search_query: searchQuery, doc_text: docText}
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

/**
 * Executes a user search. Triggered by clicking the submit button.
 *
 * Retrieves a users search query and the document text and then dispatches to a google
 * cloud function that computes the BM25 ranking function. Sets the searchResults variable with the
 * result of the GCP function and initializes prev and next buttons
 */
function query() {
    // New query, clear old results
    chrome.storage.local.remove('curResult');
    index = -1

    // get the search query
    searchQuery = document.getElementById("search").value;


    // select current tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        // execute content script to put document text in local storage
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['scripts/content.js']},
            () => chrome.runtime.lastError);
    });
}

/**
 * When the content script sends the document text, run the search query
 */
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        // get the document text from the message
        let docText = request.docText;

        // run the search query and enable prev and next buttons
        runQuery(searchQuery, docText).then(res => {
            document.getElementById("logs").innerText = "ran query";
            searchResults = res['result'];
            document.getElementById("prev").disabled = false;
            document.getElementById("next").disabled = false;
        });
    }
);

/**
 * Go to the next search result in the text. Wrap around to 0 if at the end
 */
function nextResult() {
    if (index === 4 || index >= searchResults.length) {
        index = 0
    } else {
        index++;
    }
    highlightResult()
}

/**
 * go to the previous search result in the text. Wrap around to end of list if at the start.
 */
function prevResult() {
    if (index < 1) {
        index = searchResults.length - 1
    } else {
        index--;
    }
    highlightResult()
}

/**
 * highlights the text in the active webpage referenced by searchResult[index]
 */
function highlightResult() {
    // text to highlight
    let res = searchResults[index]

    // put the current search result in local storage
    chrome.storage.local.set({
        curResult: res
    }).then(() => console.log('getting search result'));

    // select current tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        // execute content script highlight text segment of result
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['scripts/content.js']},
            () => chrome.runtime.lastError);
    });
}