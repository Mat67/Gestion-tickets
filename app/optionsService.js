'use strict'

angular.module('app').service('optionsService', function ($q) {
    var service = {
        charger: chargerImpl,
        sauvegarder: sauvegarderImpl
    }

    function sauvegarderImpl(options) {
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

        chrome.storage.sync.get(null, function(options) {
            defered.resolve(options)
        })

        return promise
    }

    return service
})