var hentaiFlag = true;
var hentaiTitle = '好好学习';
var oriTitle = document.title;

chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.info == "hide") {
            if (hentaiFlag) {
                document.body.style.opacity = 0;
                document.title = hentaiTitle;
            } else {
                document.body.style.opacity = 1;
                document.title = oriTitle;
            }
            hentaiFlag = !hentaiFlag;
        }
    }
);