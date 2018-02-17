'use strict'

angular.module('app').component('card', {
    bindings: {
      carte: '='
    },
    controller: function cardComponent() {
        console.log(this.carte)
    },
    templateUrl: function() {
        return 'views/card.html'
      }
  });