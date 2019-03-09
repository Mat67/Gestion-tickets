'use strict'

angular.module('app').component('card', {
    bindings: {
      carte: '='
    },
    controller: function cardComponent() {
        this.labelColor = function (label) {
            return 'card-label-' + label.color
        }
    },
    templateUrl: function() {
        return 'views/card.html'
      }
  });