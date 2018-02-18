'use strict'

angular.module('app').controller('trelloController', function ($scope, trelloService, glpiService) {
    $scope.cartes = []

    var tablink
    var url = window.location.toString()

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]

        if (glpiService.isGlpiPage(activeTab.url)) {
            var idTicket = glpiService.getTicketId(activeTab.url)

            if (!idTicket) {
                $scope.cartes = []
            } else {
                trelloService.rechercheCartes(idTicket).then(function (result) {
                    $scope.cartes = result
                })
            }
        }
    })
})
