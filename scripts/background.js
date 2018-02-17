/*
console.log('init')

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
       
    }   
});

chrome.tabs.onCreated.addListener(function(tab) {         
  
});
/
chrome.tabs.onActivated.addListener(function(tab) {         
    var r = chrome.contextMenus.create({
        title: "Trello",
        contexts: ["page", "link"],
        onclick: function(info, tab) {
            console.log("item " + info.menuItemId + " was clicked");
            console.log("info: " + JSON.stringify(info));
            console.log("tab: " + JSON.stringify(tab));
        }
    });
});
*/