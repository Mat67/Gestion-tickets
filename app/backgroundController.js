'use strict'

angular.module('app').controller('backgroundController', function ($scope, trelloService, glpiService, browserService) {
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  
        if (changeInfo.status === 'loading')
        
        chrome.tabs.getSelected(null, function(tab) {
            if (!glpiService.isGlpiPage(tab.url)) {
                browserService.disable(tabId)
            }
            else
            {
                var idTicket = glpiService.getTicketId(tab.url)
                trelloService.rechercheCartes(idTicket).then(function (res) {
                    browserService.setResultsCount(res.length, tabId)
                })
            }
        })
    })
})
