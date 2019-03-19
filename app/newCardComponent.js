'use strict'

angular.module('app').component('newCard', {
    bindings: {
        annuler: '=',
        valider: '=',
        ticket: '<',
        cartes: '='
    },
    controller: function newCardComponent($scope, trelloService, optionsService) {
        $scope.members = []
        $scope.titre = '' 

        chrome.tabs.getSelected(null, function(tab) {
            $scope.carte.description = tab.url

            chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
                if(response.method=="getText"){
                    $scope.carte.titre = 'GLPI_' + $scope.ticket + ' : ' + response.titre
                }
            });
        });

        this.$onInit=function() {
            $scope.ticket = this.ticket
            $scope.carte = newCard(this.ticket)
        }

        function newCard(ticket) {
            optionsService.charger().then(function (r) {
                $scope.carte.members.push(r.memberId)
                $scope.carte.labels.push(r.labelId)
            })
            
            return {
                titre: '',
                labels: [],
                members: []
            }
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

        $scope.ajouter = function ajouter() {
            trelloService.createCard($scope.carte.titre, 
                $scope.carte.description,
                $scope.carte.labels,
                $scope.carte.members).then(function (resultat) {
                    $scope.carte = {}
                    $scope.$ctrl.valider(resultat)
                })
        }

        trelloService.getMembers().then(function (result) {
            $scope.members = result
        })

        trelloService.getLabels().then(function (result) {
            $scope.labels = result
        })
    },
    templateUrl: function() {
        return 'views/newCard.html'
      }
  });