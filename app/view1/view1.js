'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', '$timeout', function ($scope, $timeout) {

    const width = 600;
    const height = 360;
    const MIN_WIDTH = 20;

    $scope.newCard = [];
    $scope.elementSelected = {};

    $scope.fonts = [
      {font: 'Arial', name: 'Arial'},
      {font: 'Serif', name: 'Serif'},
      {font: 'SansSerif', name: 'Sans Serif'},
      {font: 'Tahoma', name: 'Tahoma'},
      {font: 'Verdana', name: 'Verdana'},
      {font: 'Lucida Sans Unicode', name: 'Lucida Sans Unicode'},
      {font: 'Wide Latin', name: 'Wide Latin'}
    ];

    $scope.predefinidos = [
      {name: 'Modelo 1', image: '1.jpg'},
      {name: 'Modelo 2', image: '2.jpg'},
      {name: 'Modelo 3', image: '3.jpg'},
      {name: 'Modelo 4', image: '4.jpg'},
      {name: 'Modelo 5', image: '5.jpg'},
      {name: 'Modelo 6', image: '6.jpg'}
    ];

    let stage = new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    });

    let layer = new Konva.Layer();
    stage.add(layer);

    let tr = new Konva.Transformer();
    layer.add(tr);

    /** INSERINDO EVENTO DE SELECIONAR AO CLICAR NO ELEMENTO **/
    stage.on('click tap', function (e) {
      if (e.target === stage) {
        tr.nodes([]);
        layer.draw();
        return;
      }
      tr.nodes([e.target])
    });


    /** ADICIONANDO TEXTO **/
    $scope.addText = function () {
      let text = 'Novo Texto';
      let newText = new Konva.Text({
        x: 50,
        y: 60,
        text: text,
        fontSize: 20,
        draggable: true,
      });
      newText.tempText = text;
      layer.add(newText);
      layer.draw();
      adicionarElemento(newText);
      $scope.selectElement(newText);
    }

    /** ADICIONANDO IMAGEM **/
    $scope.addImage = function () {
      Konva.Image.fromURL('https://konvajs.org/assets/darth-vader.jpg', (img) => {
        img.setAttrs({
          width: 300,
          height: 100,
          x: 80,
          y: 100,
          name: 'image',
          draggable: true,
        });
        layer.add(img);
        layer.draw();
        $scope.selectElement(img);
        adicionarElemento(img);
      });
    }

    /** ATUALIZANDO TEXTO **/
    $scope.updateText = function (element) {
      if(typeof element.tempText !== "undefined") {
        element.text(element.tempText);
        layer.draw();
      }
    }

    $scope.moveToBack = function (element) {
      element.moveDown();
      layer.draw();
      console.log(layer)
    }

    $scope.removeElement = function () {
      $timeout(() => {
        let index = $scope.newCard.findIndex((element) => {
          return element._id === $scope.elementSelected._id;
        });
        console.log(index)
        if(index >= 0) {
          $scope.elementSelected.remove();
          $scope.elementSelected = {};
          $scope.newCard.splice(index, 1);
          layer.draw();
        }
      });
    }

    $scope.selectElement = function (element) {
      $scope.elementSelected = element;
    }

    $scope.lockElement = function (element) {
      element.lock = !element.lock;
    }

    function adicionarElemento(element) {
      $timeout(() => {
        $scope.newCard.push(element);
      });
    }
  }]);
