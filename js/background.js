chrome.contextMenus.create({
    type: 'normal',
    title: '隐藏网页',
    id: 'a',
    onclick: hide
});

function hide() {
	chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { info: "hide" });
    });
}

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.info == "hide") {
            hide();
        }
    }
);