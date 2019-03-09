'use strict'

angular.module('app').controller('optionsController', function ($scope, optionsService, trelloService) {
    $scope.options = {
        glpiTicketRegex: '',
        memberId: '',
    }

    $scope.selectedMember = {}
    
    $scope.sauvegarder = function () {
        optionsService.sauvegarder($scope.options).then(function () {
            chargerMembres()
            chargerBoardListes()
            chargerBoards()
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

    function chargerBoardListes() {
        trelloService.getBoardLists().then(function (r) {
            $scope.lists = r
        })
    }

    function chargerBoards() {
        trelloService.getBoards().then(function (r) {
            $scope.boards = r
        })
    }

    function chargerLabels() {
        trelloService.getLabels().then(function (r) {
            $scope.labels = r
        })
    }

    $scope.charger()
    chargerMembres()
    chargerLabels()
    chargerBoardListes()
    //chargerBoards()
})
