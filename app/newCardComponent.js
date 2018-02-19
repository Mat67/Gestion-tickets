'use strict'

angular.module('app').component('newCard', {
    bindings: {
        annuler: '=',
        valider: '='
    },
    controller: function newCardComponent($scope, trelloService) {
        $scope.members = []
        $scope.carte = {
            members: []
        }

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

        trelloService.getMembers().then(function (result) {
            $scope.members = result
        })
    },
    templateUrl: function() {
        return 'views/newCard.html'
      }
  });