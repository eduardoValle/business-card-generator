'use strict';

angular.module('myApp.view1', ['ngRoute'])

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/view1', {
      templateUrl: 'view1/view1.html',
      controller: 'View1Ctrl'
    });
  }])

  .controller('View1Ctrl', ['$scope', function ($scope) {

    const width = 600;
    const height = 360;
    const MIN_WIDTH = 20;

    $scope.newCard = [];
    $scope.serchFilter = '';

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
      addElement(newText);
      $scope.newCard.push(newText);
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

          const tr = new Konva.Transformer({
            nodes: [img],
            keepRatio: false,
            boundBoxFunc: (oldBox, newBox) => {
              if (newBox.width < 10 || newBox.height < 10) {
                return oldBox;
              }
              return newBox;
            },
          });

          layer.add(tr);
          layer.draw();

          img.on('transform', () => {
            img.setAttrs({
              scaleX: 1,
              scaleY: 1,
              width: img.width() * img.scaleX(),
              height: img.height() * img.scaleY(),
            });
          });
        }
      );
    }

    function addElement(element) {
      let tr = new Konva.Transformer({
        nodes: [element],
        padding: 5,
        // enable only side anchors
        enabledAnchors: ['middle-left', 'middle-right'],
        // limit transformer size
        boundBoxFunc: (oldBox, newBox) => {
          if (newBox.width < MIN_WIDTH) {
            return oldBox;
          }
          return newBox;
        },
      });
      layer.add(tr);
      layer.draw();

      element.on('transform', () => {
        element.setAttrs({
          width: Math.max(element.width() * element.scaleX(), MIN_WIDTH),
          scaleX: 1,
          scaleY: 1,
        });
      });
    }


    /** ATUALIZANDO TEXTO **/
    $scope.updateText = function (element) {
      element.text(element.tempText);
      layer.draw();
    }

    $scope.moveToBack = function (element) {
      element.moveDown();
      layer.draw();
      console.log(layer)
    }

    $scope.removeElement = function (element) {
      console.log('removeu!');
    }

    $scope.addImage();
  }]);
