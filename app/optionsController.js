'use strict'

angular.module('app').controller('optionsController', function ($scope, optionsService, trelloService) {
    $scope.options = {
        urlGestionnaireTicket: '',
        memberId: '',
    }

    $scope.selectedMember = {}
    
    $scope.sauvegarder = function () {
        optionsService.sauvegarder($scope.options).then(function () {
            alert('sauvegarde effectuée')
        })
    }

    $scope.charger = function () {
        optionsService.charger().then(function (options) {
            $scope.options = options
        })
    }

    function chargerMembres() {
        trelloService.getMembers().then(function (r) {
            $scope.members = r
        })
    }

    $scope.onChanged = function onChanged ($event) {
        $scope.options.memberId = $event
    }

    $scope.charger()
    chargerMembres()
})
