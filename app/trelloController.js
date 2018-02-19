'use strict'

angular.module('app').controller('trelloController', function ($scope, trelloService, glpiService) {
    $scope.cartes = []
    var modeAJoutCarte = false
    var modeSelectionMembres = false
    var modeSelectionEtiquettes = false

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

    $scope.selectionMembres = function selectionMembres () {
        modeSelectionMembres = true;
    }

    $scope.selectionEtiquettes = function selectionEtiquettes() {
        modeSelectionEtiquettes = true;
    }

    $scope.popopPremierNiveauVisible = function popopPremierNiveauVisible () {
        return !modeSelectionMembres && !modeSelectionEtiquettes
    }

    $scope.selectionMembresVisible = function selectionMembresVisible () {
        return modeSelectionMembres
    }

    $scope.selectionEtiquettesVisible = function selectionEtiquettesVisible () {
        return modeSelectionEtiquettes
    }

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

$(document).on('click', '.dropdown-menu', function(e) {
    if ($(this).hasClass('keep-open-on-click')) { e.stopPropagation(); }
});