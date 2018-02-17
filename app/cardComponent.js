'use strict'

angular.module('app').component('card', {
    bindings: {
      carte: '='
    },
    controller: function cardComponent() {
        this.labelColor = function (label) {
            switch (label.color) {
                case 'orange':
                    return 'card-label-orange'
                    break;
            
                default:
                    break;
            }
        }
    },
    templateUrl: function() {
        return 'views/card.html'
      }
  });