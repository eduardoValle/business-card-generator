'use strict';

angular.module('myApp.view1', ['ngRoute'])
  .directive("ngFileSelect", function () {
    return {
      link: function ($scope, el) {
        el.bind("change", function (e) {
          $scope.file = (e.srcElement || e.target).files[0];
          $scope.getFile();
        })
      }
    }
  });
