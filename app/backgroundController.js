'use strict'

angular.module('app').controller('backgroundController', function ($scope, trelloService, glpiService, browserService) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
        if (changeInfo.status === 'loading')
        
        chrome.tabs.getSelected(null, function(tab) {
            glpiService.getTicketId(tab.url).then(function (ticketId) {
                if (!ticketId) {
                    browserService.disable(tabId)
                } else {
                    trelloService.rechercheCartes(ticketId).then(function (res) {
                        browserService.setResultsCount(res.length, tabId)
                    })
                }
            })
        })
    })
})

