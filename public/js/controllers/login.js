angular.module('rateApp').controller('LoginCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    //scope for submitted data from the form
    $scope.formData = {
      email: null,
      password: null
    };
    $scope.message = '';

    //scope for posting data from the form and receive the status of the request
    $scope.submit = function(isValid) {
      if(isValid) {
        $http.post('/login', $scope.formData).
          success(function(data, status, headers, config) {
            if(data.success) {
              $location.url('/profil');
            }
            else {
              $scope.message = data.message;
            }
          }).
          error(function(data, status, headers, config) {
            $scope.message = data.message;
          });
      }
    };

    //Checking if there is an error message to display
    $scope.isMessage = function() {
      if($scope.message != '')
        return true;
      else
        return false;
    };

    //Reseting the form
    $scope.resetForm = function(formData, localLoginForm) {
      for (var elem in formData) {
        formData[elem] = null;
      }
      localLoginForm.$setPristine();
    };
  }]);
