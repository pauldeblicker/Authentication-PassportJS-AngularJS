angular.module('rateApp').controller('ProfilCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    //Getting user informations
    $http.get('/loggedin').
      success(function(user) {
        $scope.user = user;
        console.log("OK");
      });

    //scope for logging out
    $scope.logout = function() {
      $http.get('/logout').
        success(function(data) {
          console.log(data);
          $location.url('/login');
        }).
        error(function(data) {
          console.log(error);
        });
    }
  }]);
