# chrome插件小教程

### 新建一个文件夹,文件下建立images文件和js文件夹

images文件夹用来放插件图标

注意图标要是png格式



### 1.建立manifest.json文件

```javascript
{
    "manifest_version": 2,
    "name": "hentai",
    "version": "1.0",
    "description": "hentai插件",
    "icons": {
        "16": "images/hentai.png",
        "48": "images/hentai.png",
        "128": "images/hentai.png"
    },
    "browser_action": {
        "default_icon": {
            "19": "images/hentai.png",
            "38": "images/hentai.png"
        },
        "default_title": "hentai",
        "default_popup": "popup.html"
    }
}
```

### 2.新建一个popup.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>hentai</title>
    <style type="text/css">
        body {
            width: 250px;
            text-align: center;
        }
    </style>
</head>
<body>
    <h3>做MAD的都是SB</h3>
    <h3>自古多情留不住，总是套路得人心</h3>
</body>
</html>
```

### 3.添加右键显示功能

 * 更改manifest.json文件，添加：
```javascript
"background": {
        "scripts": [
            "js/background.js"
        ]
 },
"permissions": ["tabs", "contextMenus"]
```

 * 在js文件夹新建background.js
```javascript
chrome.contextMenus.create({
    type: 'normal',
    title: '隐藏网页',
    id: 'a',
    onclick: hide
});

function hide() {}
```

### 4.实现隐藏功能

 * 完成hide函数
```javascript
function hide() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { info: "hide" });
    });
}
```

 * 更改manifest.json文件，添加：
```javascript
"content_scripts": [{
        "matches": ["http://*/", "https://*/", "http://*/*", "https://*/*"],
        "js": ["js/hide.js"]
}]
```

 * 在js文件夹新建hide.js
```javascript
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
```

### 5.实现点击图标也可以隐藏网页

 * 在js文件夹新建index.js,并在popup页面引入
```javascript
chrome.runtime.sendMessage({info: "hide"});
```

 * 修改background.js
```javascript
chrome.runtime.onMessage.addListener(
    function(request) {
        if (request.info == "hide") {
            hide();
        }
    }
);
```
