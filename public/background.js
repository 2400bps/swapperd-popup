let swapDetails = null;

let popup = null;

const refreshBadge = () => {
    chrome.browserAction.setBadgeBackgroundColor({
        color: [255, 0, 0, 128],
    });

    chrome.browserAction.setBadgeText({
        text: swapDetails === null ? '' : '1',
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.method === "getswapDetails") {
        sendResponse({
            method: "getswapDetails",
            swapDetails,
        });
    } else if (request.method === "approvedSwap") {
        popup.close();
        popup = null;
        swapDetails = null;
        refreshBadge();
    } else if (request.method === "requestSwap") {
        swapDetails = request.swapDetails;

        popup = window.open('index.html', 'Approve Swap', 'width=640,height=480,location=no,scrollbars=yes');
        let timer = setInterval(function () {
            if (!popup || popup.closed) {
                clearInterval(timer);

                swapDetails = null;
                popup = null;
                refreshBadge();
            }
        }, 1000);

        refreshBadge();

        sendResponse();
    }
});