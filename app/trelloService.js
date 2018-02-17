'use strict'

angular.module('app').service('trelloService', function ($http) {
    var service = {
        rechercheCartes: rechercheCartesImpl
    }
    var token = '87bb626434f4542e68649ac0492c53cd452f2c14e98601bdb352d16d2866aae3'
    var key = 'f591bda7cc554fec77c38cc22923b547'
    var apiTrello = 'https://api.trello.com/1/'

    function rechercheCartesImpl(idTicket) {
        var requete = buildRequete('boards/7iR1688Y/cards?fields=name,url')
        return $http.get(requete).then(function (result) {
            var cartes = result.data
            cartes = _.filter(cartes, function (f) {
                return f.name.indexOf('GLPI_' + idTicket) !== -1
            })
            
            return cartes
        })
    }

    function buildRequete(requete) {
        return apiTrello + requete + '&key=' + key + '&token=' + token;
    }

    return service;
})