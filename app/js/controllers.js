'use strict';

/* Controllers */

var controllers = angular.module('rectanglifyControllers', []);

controllers.controller('RectanglifyCtrl', ['$scope', '$window',

  function($scope, $window) {
    function color(n) {
      var interpolate = d3.interpolateHsl(colorbrewer.Blues[9][0], colorbrewer.Blues[9][8]);
      return function(d, i) {
        return interpolate(i/n);
      }
    }

    $scope.visualize = function() {
      var data = $scope.data,
          rects = [],
          body = d3.select("body"),
          svg, g,
          col = color(data.length),
          treemap = d3.treemap(),
          config = d3.treemap.configurations[this.algorithmConfiguration];

      treemap.size([$window.innerWidth, $window.innerHeight]);
      treemap.phrase(config.phrase.make(this.chunkConfiguration));
      rects = treemap(data)

      svg = d3.select(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
      svg.attr("width", $window.innerWidth)
      svg.attr("height", $window.innerHeight)

      g = svg.select("g").empty() ? svg.append("g") : body.select("g");
      g = g.selectAll("rect").data(rects);
      g.enter().append("rect")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("width", function(d) { return d.width; })
        .attr("height", function(d) { return d.height; })
        .style("fill", col)
        .style("stroke", col);

      // From: https://github.com/qrohlf/trianglify
      var s = new XMLSerializer();
      var svgString = s.serializeToString(svg.node());
      var base64 = btoa(svgString);
      var dataUri = 'data:image/svg+xml;base64,' + base64;
      var dataUrl = 'url(' + dataUri + ')';
      document.body.setAttribute('style', 'background-image: ' + dataUrl);
    }

    $scope.generateData = function() {
      var count = $scope.config.data.elements;
      $scope.data = Array.apply(null, Array(count)).map(Math.random);
      $scope.visualize();
    }

    $scope.data = [];
    $scope.config = {
      data: {
        elements: 100
      },
    };
    $scope.controls = {
      isVisible: false,
      isFirstOpen: true
    };

    $scope.algorithmConfigurations = Object.getOwnPropertyNames(d3.treemap.configurations);
    $scope.algorithmConfiguration = $scope.algorithmConfigurations[0];
    $scope.chunkConfigurations = d3.treemap.configurations.grid.phrase.allowed;
    $scope.chunkConfiguration = $scope.chunkConfigurations[0];

    // Generate an initial data set and visualize the results.
    $scope.generateData();

    angular.element($window).bind('resize', $scope.visualize);
  }]);
