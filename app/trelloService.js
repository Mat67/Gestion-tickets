'use strict'

angular.module('app').service('trelloService', function ($http, $q, optionsService) {
    var service = {
        rechercheCartes: rechercheCartesImpl,
        getMembers: getMembersImpl,
        getBoardLists: getBoardListsImpl,
        getBoards: getBoardsImpl,
        getMember: getMemberImpl,
        getLabels: getLabelsImpl,
        createCard: createCardImpl
    }

    var options = { }

    // var token = '87bb626434f4542e68649ac0492c53cd452f2c14e98601bdb352d16d2866aae3'
    // var key = 'f591bda7cc554fec77c38cc22923b547'
    // var apiTrello = 'https://api.trello.com/1/'

    function rechercheCartesImpl(idTicket) {
        var fields = 'name,url,idMembers,labels'
        
        var defer = $q.defer()

        buildRequete('boards/{board}/cards?fields=all').then(function (requete) { 
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
        var defer = $q.defer()

        buildRequete('boards/{board}/members?fields=all').then(function (requete) { 
            $http.get(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })
        return defer.promise
    }

    function getMemberImpl(idMember) {
        var defer = $q.defer()

        buildRequete('members/' + idMember + '?fields=all').then(function (requete) { 
            $http.get(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })

        return defer.promise
    }

    function getBoardListsImpl() {
        var defer = $q.defer()

        buildRequete('board/{board}/lists?fields=all').then(function (requete) { 
            $http.get(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })

        return defer.promise
    }

    function getBoardsImpl() {
        var defer = $q.defer()

        buildRequete('members/{member}/boards?fields=all').then(function (requete) { 
            $http.get(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })

        return defer.promise
    }

    function getLabelsImpl() {
        var defer = $q.defer()

        buildRequete('board/{board}/labels?fields=all').then(function (requete) { 
            $http.get(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })

        return defer.promise
    }

    function createCardImpl(titre, labels, members) {
        var defer = $q.defer()

        // var idList = '541c3b1a4298bfc8767d2643' // Planifie
        // 577a0d36360c9ab3098b59b1
        //var idList = options.idList // Welcome Board
        
        var stringRequete = 'cards?name=' + titre + '&idList={idList}'
        if (members)
            stringRequete += '&idMembers=' + members

        if (labels)
            stringRequete += '&labels=' + labels

        buildRequete(stringRequete).then(function (requete) {
            $http.post(requete).then(function (result) {
                defer.resolve(result.data)
            })
        })
        
        return defer.promise
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
        var defer = $q.defer()

        optionsService.charger().then(function (r) { 
            options = r 
        }).then(function (r) {
            requete = requete.replace('{board}', options.board)
            requete = requete.replace('{idList}', options.idList)
            requete = requete.replace('{member}', options.memberId)
            
            requete = options.apiTrello + requete + '&key=' + options.key + '&token=' + options.token
            
            defer.resolve(encodeURI(requete))
        })

        return defer.promise
    }

    return service;
})