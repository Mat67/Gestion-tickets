'use strict'

angular.module('app').service('trelloService', function ($http, $q, optionsService) {
    var service = {
        rechercheCartes: rechercheCartesImpl,
        getMembers: getMembersImpl,
        getMember: getMemberImpl,
        createCard: createCardImpl
    }

    var options = { }

    // var token = '87bb626434f4542e68649ac0492c53cd452f2c14e98601bdb352d16d2866aae3'
    // var key = 'f591bda7cc554fec77c38cc22923b547'
    // var apiTrello = 'https://api.trello.com/1/'

    optionsService.charger().then(function (result) {
        options = result
    })

    function rechercheCartesImpl(idTicket) {
        var fields = 'name,url,idMembers,labels'
        

        var defer = $q.defer()

        optionsService.charger().then(function (r) { 
            options = r 
        }).then(function (r) {
            var requete = buildRequete('boards/' + options.board + '/cards?fields=all')
            
            $http.get(requete).then(function (result) {
                var cartes = result.data
                cartes = _.filter(cartes, function (f) {
                    return f.name.indexOf('GLPI_' + idTicket) !== -1
                })
    
                _.forEach(cartes, function (c) {
                    c.members = []
                    _.forEach(c.idMembers, function (m) {
                        service.getMember(m).then(function (result) {
                            c.members.push(result)
                        })
                    })
                })
                defer.resolve(cartes)
            })
        })

        return defer.promise
    }

    function getMembersImpl() {
        var requete = buildRequete('boards/' + options.board + '//members?fields=all')
        
        return $http.get(requete).then(function (result) {
            return result.data
        })
    }

    function getMemberImpl(idMember) {
        var requete = buildRequete('members/' + idMember + '?fields=all')
        
        return $http.get(requete).then(function (result) {
            return result.data
        })
    }

    function createCardImpl(titre, labels, members) {
        // var idList = '541c3b1a4298bfc8767d2643' // Planifie
        // 577a0d36360c9ab3098b59b1
        var idList = options.idList // Welcome Board
        
        var stringRequete = 'cards?name=' + titre + '&idList=' + idList
        if (members)
            stringRequete += '&idMembers=' + members

        if (labels)
            stringRequete += '&labels=' + labels

        var requete = buildRequete(stringRequete)
        //console.log(requete)
        return $http.post(requete).then(function (result) {
             return result.data
         })
    }

    function getMemberMemoizeImpl(idMember) {
        var requete = buildRequete('members/' + idMember + '?fields=all')
        var defered = $q.defer()
        var promise = defered.promise
        promise = promise.then(function (id) {
            var result =  _.memoize(function(id) {
                return $http.get(requete).then(function (result) {
                    return result.data
                })
              })

            return result(id)
        })

        defered.resolve(idMember)

        return promise
    }

    function buildRequete(requete) {
        return options.apiTrello + requete + '&key=' + options.key + '&token=' + options.token;
    }

    return service;
})