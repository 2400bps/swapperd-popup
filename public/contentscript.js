window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source !== window) {
        return;
    }

    if (event && event.data) {
        chrome.extension.sendMessage(event.data, function (response) {
            // console.log(`Got response contentscript.js: ${JSON.stringify(response)}`);
            window.postMessage(response, "*");
        });
    }

    // console.log(`Got message in contentscript.js: ${JSON.stringify(event)}`);

}, false);