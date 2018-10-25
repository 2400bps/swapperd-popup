let swapDetails = null;

let popup = null;
let tabID = null;

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

        chrome.tabs.sendMessage(tabID, {
            ok: true,
            message: "Swap request approved",
            data: request.response,
        }, function (response) {
            // console.log(response);
        });
        tabID = null;
    } else if (request.method === "rejectedSwap") {
        popup.close();
        popup = null;
        swapDetails = null;
        refreshBadge();
        chrome.tabs.sendMessage(tabID, {
            ok: false,
            message: "Swap request approved",
        }, function (response) {
            // console.log(response);
        });
        tabID = null;
    } else if (request.method === "requestSwap") {
        if (swapDetails || popup || tabID) {
            sendResponse({
                ok: false,
                message: "Swap request already initialized",
            })
        }


        swapDetails = request.swapDetails;

        popup = window.open('index.html', 'Approve Swap', 'width=380,height=520,location=no,scrollbars=yes');
        let timer = setInterval(function () {

            if (!popup || popup.closed) {
                clearInterval(timer);

                swapDetails = null;
                popup = null;
                refreshBadge();
            }
        }, 1000);

        refreshBadge();

        tabID = sender.tab.id;
    }
});