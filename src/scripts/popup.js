// initialize variables for iterating over search results
let searchResults = [];
let index = -1;

// add listeners to all buttons
document.getElementById('button').addEventListener("click", query);
document.getElementById('next').addEventListener("click", nextResult);
document.getElementById('prev').addEventListener("click", prevResult);

/**
 * Executes a user search. Triggered by clicking the submit button.
 *
 * Retrieves a users search query and the document text and then dispatches to a google
 * cloud function that computes the BM25 ranking function. Sets the searchResults variable with the
 * result of the GCP function and initializes prev and next buttons
 */
function query() {
    // New query, clear old results
    chrome.storage.local.remove('searchResult');
    index = -1

    // get the search query
    let searchQuery = document.getElementById("search").value;

    // select current tab
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {

        // execute content script to put document text in local storage
        chrome.scripting.executeScript({target: {tabId: tabs[0].id}, files: ['scripts/content.js']},
            () => {
                let _ = chrome.runtime.lastError;

                // https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri
                // Get the document text from local storage
                chrome.storage.local.get('docText', function (items) {

                    // run the search query and enable
                    if (items != null) {
                        searchResults = runQuery(searchQuery, items.docText);
                        document.getElementById("prev").disabled = false;
                        document.getElementById("next").disabled = false;
                    }
                });
            });
    });
}

/**
 * Go to the next search result in the text
 */
function nextResult() {
    console.log("hi");
}

/**
 * go to the previous search result in the text
 */
function prevResult() {
    console.log("hi");

}

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