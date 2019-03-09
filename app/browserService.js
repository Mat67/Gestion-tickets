'use strict'

angular.module('app').service('browserService', function ($http, $q, optionsService) {
    var service = {
        disable: disableImpl,
        setResultsCount: setResultsCountImpl
    }
    
    function disableImpl (tabId) {
        chrome.browserAction.disable(tabId)
    }

    function setResultsCountImpl (count, tabId) {
        chrome.browserAction.enable(tabId)

        if (count === 0) {
            chrome.browserAction.setBadgeText({ text: '*', 'tabId': tabId })
            chrome.browserAction.setBadgeBackgroundColor({ color: [238, 170, 86, 1], 'tabId': tabId })
        }           
        else {
            chrome.browserAction.setBadgeText({ text: count.toString(), 'tabId': tabId })
            chrome.browserAction.setBadgeBackgroundColor({ color: [39, 116, 196, 1], 'tabId': tabId })
        }
    }

    return service;
})