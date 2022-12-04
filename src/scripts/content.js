// chrome.storage.local.get('searchQuery', function (items) {
//     if (items != null) {
//         doSearch(items);
//     }
// });

// listen for messages sent from background.js
console.log("Getting Text!") // new url is now in content scripts!
chrome.storage.local.set({
    docText: document.body.innerText
}).then(() => console.log("text is set"));

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         // listen for messages sent from background.js
//         if (request.message === 'get_text') {
//             console.log("Getting Text!") // new url is now in content scripts!
//             chrome.storage.local.set({
//                 docText: document.body.innerText
//             }).then(() => console.log("text is set"));
//         }
//     });

// function doSearch(items) {
//     let searchQuery = items.search;
//     console.log(searchQuery);
//     console.log(document.body.innerText);
//     // runQuery(searchQuery).then(res => {
//     //     console.log("search done: ")
//     //     let parsed_res = JSON.parse(ret.data);
//     //     console.log(parsed_res)
//     // }).catch(err => {
//     //     console.log("search failed");
//     //     console.log(err);
//     // });
//
//     runQuery(searchQuery).then((data) => {
//         console.log(data);
//     });
// }

function highlight(text) {
    let inputText = document.body;
    let innerHTML = inputText.innerHTML;
    let index = innerHTML.indexOf(text);
    if (index >= 0) {
        innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index, index + text.length) + "</span>" + innerHTML.substring(index + text.length);
        inputText.innerHTML = innerHTML;
    }
}

// function runQuery(searchQuery) {
//     const url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
//     const data = {'search_query': searchQuery};
//     return fetch(url, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json',},
//         body: JSON.stringify(data),
//     });
// }

// // Example POST method implementation:
// async function runQuery(searchQuery) {
//     const url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", url, true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({
//         search_query: searchQuery
//     }));
// }

// // Example POST method implementation:
// async function runQuery(searchQuery) {
//     const url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
//     const data = {search_query: searchQuery}
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors', // no-cors, *cors, same-origin
//         credentials: 'omit',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }

// // Example POST method implementation:
// async function runQuery(searchQuery) {
//     // const  url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
//     const url = "http://a7e9830ea06c0d9ea803a8f10605c59e-dot-z456e6cead904d346p-tp.appspot.com/"
//     const data = {search_query: searchQuery}
//     const response = await fetch(url, {
//         method: 'POST',
//         mode: 'cors', // no-cors, *cors, same-origin
//         credentials: 'omit',
//         headers: {
//             'Access-Control-Allow-Origin': '*',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
// }


// function runQuery(searchQuery) {
//     let url = 'https://us-central1-cs-410-project.cloudfunctions.net/search-bm25';
//     let data = {'search_query': searchQuery};
//     return fetch(url, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json',},
//         body: JSON.stringify(data),
//     });
// }