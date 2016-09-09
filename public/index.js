// var cookies = require('angular-cookies');

angular.module('smartNews', [
  'ui.router',
  'smartNews.home',
  'smartNews.results',
  'ngCookies',
  'smartNews.services',
  'ngSanitize'
])

.config(function($urlRouterProvider, $stateProvider) {

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'features/home/home.html',
      controller: 'HomeCtrl',
      authenticate: false
    })

    .state('results', {
      url: '/results/:input',
      templateUrl: 'features/results/results.html',
      controller: 'ResultsCtrl',
      authenticate: false
    });

  $urlRouterProvider.otherwise('/');

})

.controller('SearchCtrl', function($scope, $state, $http, renderGraph){
  $scope.searchinput = '';

  $scope.renderView = function() {
    var url = '/results/' + $scope.searchinput;
    if ($scope.searchinput) {
      $http({
        method: 'GET',
        url: url
      })
      .then(
        function(obj){
          console.log('obj:', obj);
          $state.go('results', {input: JSON.stringify(obj.data)})
          .then(function(){
            renderGraph(obj);
          });
        },
        function(error){
          console.log('there was an error!!', error);
        }
      );
    } else {
      $state.go('home');
    }
  };

})

.directive('navbar', function(){
  return {
    templateUrl: 'features/nav/nav.html',
    controller: 'NavCtrl'
  };
});
