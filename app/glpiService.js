'use strict'

angular.module('app').service('glpiService', function ($http, $q, optionsService) {
    var service = {
        isGlpiPage: isGlpiPageImpl,
        getTicketId: getTicketIdImpl
    }

    function isGlpiPageImpl(url) {
        var defer = $q
        
        optionsService.charger().then(function (r) {
            if (url && url.indexOf('helpdesk.groupe-burrus') !== -1)
                defer.resolve(true)
            else
                defer.resolve(false)
        })

        return defer.promise
    }


    function getTicketIdImpl(url) {
        var defer = $q.defer()
        
        var ticketId = undefined

        optionsService.charger().then(function (r) {
            if (url) {
                var regex2 = new RegExp('.*helpdesk.groupe-burrus.*id=(.*)', 'g')
                var resultat = regex2.exec(url)
                
                if (resultat && resultat.length > 0) {
                    ticketId = resultat[1]
                }

                defer.resolve(ticketId)
            } else {
                defer.resolve(ticketId)
            }
        })

        return defer.promise
    }

    return service;
})