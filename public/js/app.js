var rateApp = angular.module('rateApp', [
  'ngRoute'
])

//Checking if the user is connected
var checkSignin = function ($q, $timeout, $http, $rootScope, $location) {
  // Initialize a new promise
  var deferred = $q.defer();
  $http.get('/loggedin').success(function (user) {
    // if(authenticated)
    if (user !== '0') {
      $rootScope.user = user;
      $timeout(deferred.resolve, 0);
      console.log(user);
    // if(!Authenticated)
    } else {
      $rootScope.message = 'You need to log in.';
      $timeout(function () { deferred.reject(); }, 0);
      $location.path('login');
    }
  });
  return deferred.promise;
};

//Defining angular routes
rateApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/login', {
      templateUrl:'./partials/login.html',
      controller: 'LoginCtrl'
    }).
    when('/signup', {
      templateUrl: './partials/signup.html',
      controller: 'SignupCtrl'
    }).
    when('/profil', {
      templateUrl: './partials/profil.html',
      controller: 'ProfilCtrl',
      resolve: {
        verification: checkSignin
      }
    }).
    otherwise({
      redirectTo: '/login'
    })
  }]);
