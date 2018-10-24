window.addEventListener("message", function (event) {
    // We only accept messages from ourselves
    if (event.source !== window) {
        return;
    }

    if (event.data.method && (event.data.method === "requestSwap")) {
        chrome.extension.sendMessage({
            method: event.data.method,
            swapDetails: event.data.swapDetails,
        }, function (response) {
            //
        });
    }
}, false);