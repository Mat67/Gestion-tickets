'use strict'

angular.module('app').controller('optionsController', function ($scope, optionsService) {
    $scope.options = {
        urlGestionnaireTicket: '',
        prefixeUtilisateurTrello: '',
    }
    
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

    $scope.charger()
})
