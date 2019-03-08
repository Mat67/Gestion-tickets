'use strict'

angular.module('app').service('optionsService', function ($q) {
    var service = {
        charger: chargerImpl,
        sauvegarder: sauvegarderImpl
    }

    function sauvegarderImpl(options) {
        var options = {
            urlGestionnaireTicket: options.urlGestionnaireTicket,
            prefixeUtilisateurTrello: options.prefixeUtilisateurTrello 
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
            urlGestionnaireTicket: '',
            prefixeUtilisateurTrello: '' 
        }
        
        var defered = $q.defer()
        var promise = defered.promise

        chrome.storage.sync.get(null, function(item) {
            options.urlGestionnaireTicket = item.urlGestionnaireTicket
            options.prefixeUtilisateurTrello = item.prefixeUtilisateurTrello
            
            defered.resolve(options)
        });

        return promise
    }


    return service
})