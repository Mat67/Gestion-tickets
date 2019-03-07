chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
    chrome.tabs.getSelected(null, function(tab) {
        var url = tab.url
        if (url && url.indexOf('glpi') !== -1) {
            localStorage.setItem("welcome-message",'hello'); 
            chrome.browserAction.enable()
            chrome.browserAction.setBadgeBackgroundColor({ color: [238, 170, 86, 1] })
            chrome.browserAction.setBadgeText({ text: '?' })
        } else {
            chrome.browserAction.disable(tabId)
        }
    })
    
    // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    //     if (tabs.length > 0) {
    //         var url = tabs[0].url

    //         if (url && url.contains('glpi')) {
    //             chrome.browserAction.enable()
    //             chrome.browserAction.setBadgeBackgroundColor({ color: [238, 170, 86, 1] })
    //             chrome.browserAction.setBadgeText({ text: '?' })
    //         } else {
    //             chrome.browserAction.disable()
    //         }
    //     } else {
    //         chrome.browserAction.disable()
    //     }
        
    // })
})

chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
        if(request.method == "getText"){
            sendResponse({data: document.all[0].innerText, method: "getText"}); //same as innerText
        }
    }
)

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.action == "getDOM")
      sendResponse({dom: "The dom that you want to get"});
    else
      sendResponse({}); // Send nothing..
   });

/*
console.log('init')

var r = chrome.contextMenus.create({
        title: "Trello",
        contexts: ["page", "link"],
        onclick: function(info, tab) {
            console.log("item " + info.menuItemId + " was clicked");
            console.log("info: " + JSON.stringify(info));
            console.log("tab: " + JSON.stringify(tab));
        }
    });

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete') {
       
    }   
});

chrome.tabs.onCreated.addListener(function(tab) {         
  
});
/

*/