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

    function visualize() {
      var data = $scope.data,
          rects = [],
          body = d3.select("body"),
          svg, g,
          col = color(data.length);

      $scope.config.vis.treemap.size([$window.innerWidth, $window.innerHeight])
      rects = $scope.config.vis.treemap(data)

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

    function generateData() {
      var count = $scope.config.data.elements;
      $scope.data = Array.apply(null, Array(count)).map(Math.random);
      visualize();
    }

    $scope.data = [];
    $scope.config = {
      data: {
        elements: 100
      },
      vis: {
        treemap: d3.treemap()
      }
    };
    $scope.controls = {
      isVisible: false,
      isFirstOpen: true
    };

    $scope.generateData = generateData;
    $scope.chunkConfigurations = Object
      .getOwnPropertyNames(d3.layout.phrase)
      .filter(function(x) { return x !== 'properties'; });

    // Generate an initial data set and visualize the results.
    $scope.generateData();

    angular.element($window).bind('resize', visualize);
  }]);
