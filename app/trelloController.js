// 'use strict'

angular.module('app').controller('trelloController', function ($scope, trelloService, glpiService) {
    $scope.cartes = []

    var modeAJoutCarte = false

    $scope.saisieVisible = function saisieVisible () {
        return modeAJoutCarte
    }

    $scope.ajoutCarteVisible = function ajoutCarteVisible () {
        return !modeAJoutCarte
    }

    $scope.demarrerSaisie = function demarrerSaisie() {
        modeAJoutCarte = true
    }

    $scope.annulerSaisie = function annulerSaisie() {
        modeAJoutCarte = false
    }

    $scope.validerSaisie = function validerSaisie(carte) {
        modeAJoutCarte = false
        $scope.cartes.push(carte)
    }

    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        var activeTab = tabs[0]

        glpiService.getTicketId(activeTab.url).then(function (ticketId) {
            $scope.idTicket = ticketId

            if (!$scope.idTicket) {
                $scope.cartes = []
            } else {
                trelloService.rechercheCartes($scope.idTicket).then(function (result) {
                    $scope.cartes = result
                })
            }
        })
    })
})

$(document).on('click', '.dropdown-menu', function(e) {
    if ($(this).hasClass('keep-open-on-click')) { if (e.target.outerText !== 'clear') e.stopPropagation(); }
});