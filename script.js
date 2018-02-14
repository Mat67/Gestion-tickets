var gDriveApp = angular.module('gDriveApp', []);

gDriveApp.factory('gdocs', function() {
  var gdocs = new GDocs();
  return gdocs;
});

function DocsController($scope, $http, gdocs) {
  $scope.docs = [];

  $scope.fetchDocs = function() {
    
  };

  // Invoke on ctor call. Fetch docs after we have the oauth token.
  gdocs.auth(function() {
    $scope.fetchDocs();
  });

}