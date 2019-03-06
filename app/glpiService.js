'use strict'

angular.module('app').service('glpiService', function ($http, $q) {
    var service = {
        isGlpiPage: isGlpiPageImpl,
        getTicketId: getTicketIdImpl
    }

    function isGlpiPageImpl(url) {
        if (url && url.indexOf('helpdesk.groupe-burrus') !== -1)
            return true
        
        return false
    }

    function getTicketIdImpl(url) {
        if (url) {
            var regex2 = new RegExp('.*helpdesk.groupe-burrus.*id=(.*)', 'g')
            var resultat = regex2.exec(url)
            if (resultat && resultat.length > 0) {
                return resultat[1]
            }
        }

        return undefined
    }

    return service;
})