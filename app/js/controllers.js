'use strict';

/* Controllers */

var phonecatControllers = angular.module('rectanglifyControllers', []);

phonecatControllers.controller('RectanglifyCtrl', ['$scope',
  function($scope) {
    $scope.controlsVisible = false;

    $scope.controlsButtonText = 'Show controls';
    $scope.chunkConfigurations = Object
      .getOwnPropertyNames(d3.layout.phrase)
      .filter(function(x) { return x !== 'properties'; });

    $scope.toggleControls = function() {
      $scope.controlsButtonText = $scope.controlsVisible ? 'Show controls' : 'Hide controls';
      $scope.controlsVisible = !$scope.controlsVisible;
    }

  }]);
