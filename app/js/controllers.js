'use strict';

/* Controllers */

var phonecatControllers = angular.module('rectanglifyControllers', []);

phonecatControllers.controller('RectanglifyCtrl', ['$scope',
  function($scope) {

    $scope.controls = {};
    $scope.controls.isVisible = true;
    $scope.controls.isFirstOpen = true;

    $scope.chunkConfigurations = Object
      .getOwnPropertyNames(d3.layout.phrase)
      .filter(function(x) { return x !== 'properties'; });

  }]);
