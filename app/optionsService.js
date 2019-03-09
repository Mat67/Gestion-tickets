'use strict'

angular.module('app').service('optionsService', function ($q) {
    var service = {
        charger: chargerImpl,
        sauvegarder: sauvegarderImpl
    }

    function sauvegarderImpl(options) {
        var options = {
            glpiTicketRegex: options.glpiTicketRegex,
            memberId: options.memberId,
            apiTrello: options.apiTrello,
            key: options.key,
            token: options.token,
            board: options.board,
            idList: options.idList
        }

        var defered = $q.defer()
        var promise = defered.promise
        
        chrome.storage.sync.set(options, function() {
            defered.resolve(options)
        });

        return promise
    }

    function chargerImpl() {
        var options = {
            glpiTicketRegex: '',
            memberId: '' 
        }
        
        var defered = $q.defer()
        var promise = defered.promise

        chrome.storage.sync.get(null, function(item) {
            options.glpiTicketRegex = item.glpiTicketRegex
            options.memberId = item.memberId
            options.apiTrello = item.apiTrello
            options.key = item.key
            options.token = item.token
            options.board = item.board
            options.idList = item.idList
            
            defered.resolve(options)
        })

        return promise
    }


    return service
})