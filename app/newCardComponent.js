'use strict'

angular.module('app').component('newCard', {
    bindings: {
        annuler: '=',
        valider: '=',
        ticketId: '@'
    },
    controller: function newCardComponent($scope, trelloService) {
        $scope.members = []

        function newCard() {
            var titre = ''
            if ($scope.$ctrl.ticketId)
                titre = 'GLPI_' + $scope.$ctrl.ticketId
            
            return {
                titre: titre,
                labels: '',
                members: []
            }
        }

        $scope.carte = newCard()

        var modeSelectionMembres = false
        var modeSelectionEtiquettes = false

        $scope.annulerSaisie = this.annulerSaisie

        $scope.selectionMembres = function selectionMembres () {
            modeSelectionMembres = true
        }

        $scope.selectionEtiquettes = function selectionEtiquettes() {
            modeSelectionEtiquettes = true
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

        $scope.retour = function retour() {
            modeSelectionMembres = false
            modeSelectionEtiquettes = false;
        }

        $scope.isChecked = function isChecked(member) {
            if ($scope.carte.members && _.contains($scope.carte.members, member.id ))
                return 'checked'
            
            return ''
        }

        $scope.performCheck = function performCheck(member) {
            if ($scope.carte.members && _.contains($scope.carte.members, member.id ))
                $scope.carte.members = _.filter($scope.carte.members, function(m){ return m !== member.id });
            else 
                $scope.carte.members.push(member.id)
        }

        $scope.ajouter = function ajouter() {
            $scope.$ctrl.valider()
            
            trelloService.createCard($scope.carte.titre, 
                $scope.carte.labels,
                $scope.carte.members).then(function (resultat) {
                    $scope.carte = {}
                    $scope.$ctrl.valider(resultat)
                })
        }

        trelloService.getMembers().then(function (result) {
            $scope.members = result
        })
    },
    templateUrl: function() {
        return 'views/newCard.html'
      }
  });