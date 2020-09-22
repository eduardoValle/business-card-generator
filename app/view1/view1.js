'use strict';

angular.module('myApp.view1')

  .controller('View1Ctrl', ['$scope', '$timeout', 'fileReader', 'konvasFactory', function ($scope, $timeout, fileReader, konvasFactory) {

    const width = 600;
    const height = 360;

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

    $scope.images = [
      {name: 'Modelo 1', image: '../assets/images/backgrounds/1.jpg'},
      {name: 'Modelo 2', image: '../assets/images/backgrounds/2.jpg'},
      {name: 'Modelo 3', image: '../assets/images/backgrounds/3.jpg'},
      {name: 'Modelo 4', image: '../assets/images/backgrounds/4.jpg'},
      {name: 'Modelo 5', image: '../assets/images/backgrounds/5.jpg'},
      {name: 'Modelo 6', image: '../assets/images/backgrounds/6.jpg'}
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

    konvasFactory.addClickOnElementEvents(stage, tr, layer);


    /** ADICIONAR ELEMENTO NA LISTA **/
    function adicionarElemento(element) {
      $timeout(() => {
        $scope.newCard.push(element);
      });
    }

    /** ADICIONANDO TEXTO **/
    $scope.addText = function () {
      let textElement = konvasFactory.addTextElement(layer, 'Novo Texto');
      adicionarElemento(textElement);
      $scope.selectElement(textElement);
    }

    /** ADICIONANDO IMAGEM **/
    $scope.addImage = function (caminhoImagem) {
      // Konva.Image.fromURL('https://konvajs.org/assets/darth-vader.jpg', (img) => {
      Konva.Image.fromURL(caminhoImagem, (img) => {
        img.setAttrs({
          width: 500,
          height: 300,
          x: 0,
          y: 0,
          name: 'image',
          imagePath: caminhoImagem,
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

    /** MOVER ITEM PARA A CAMADA ACIMA **/
    $scope.moveToBack = function (element) {
      element.moveDown();
      layer.draw();
    }

    /** REMOVER ELEMENTO **/
    $scope.removeElement = function () {
      $timeout(() => {
        let index = $scope.newCard.findIndex((element) => {
          return element._id === $scope.elementSelected._id;
        });

        if(index >= 0) {
          $scope.elementSelected.remove();
          $scope.elementSelected = {};
          $scope.newCard.splice(index, 1);
          layer.draw();
        }
      });
    }

    /** SELECIONAR ELEMENTOS **/
    $scope.selectElement = function (element) {
      $scope.elementSelected = element;
    }

    /** TROCAR A FONTE DO TEXTO **/
    $scope.changeTextFont = function (element) {
      element.fontFamily(element.attrs.fontFamily);
      layer.draw();
    }

    /** TROCAR A COR DO TEXTO **/
    $scope.changeTextFontColor = function (element) {
      element.fill(element.attrs.fill);
      layer.draw();
    }

    /** TROCAR O ESTILO DO TEXTO **/
    $scope.changeTextStyle = function (element, style) {
      element.attrs.fontStyle = element.attrs.fontStyle ? element.attrs.fontStyle : '';
      let index = element.attrs.fontStyle.indexOf(style);
      if(index >= 0) {
        element.attrs.fontStyle = element.attrs.fontStyle.replace(style, '')
      } else {
        element.attrs.fontStyle += ' ' + style;
      }
      element.fontStyle(element.attrs.fontStyle);
      layer.draw();
    }

    /** TROCAR  A DECORAÇÃO DO TEXTO **/
    $scope.changeTextDecoration = function (element, decoration) {
      element.attrs.fontDecoration = element.attrs.fontDecoration ? element.attrs.fontDecoration : '';
      let index = element.attrs.fontDecoration.indexOf(decoration);
      if(index >= 0) {
        element.attrs.fontDecoration = '';
      } else {
        element.attrs.fontDecoration += decoration;
      }
      element.textDecoration(element.attrs.fontDecoration);
      layer.draw();
    }

    $scope.lockElement = function (element) {
      $timeout(() => {
        element.attrs.draggable = !element.attrs.draggable;
        element.draggable(element.attrs.draggable);
        layer.draw();
      });
    }

    $scope.moveElement = function (element, numIndexToMove) {
      $timeout(() => {
        let index = $scope.newCard.findIndex((element) => {
          return element._id === $scope.elementSelected._id;
        });

        let newIndex = index + numIndexToMove;
        if(newIndex < 0) {
          element.moveToBottom();
          return;
        }

        if(newIndex > ($scope.newCard.length -1)) {
          element.moveToTop();
          return;
        }

        let temp = $scope.newCard[newIndex];
        $scope.newCard[newIndex] = element;
        $scope.newCard[index] = temp;

        if(numIndexToMove > 0) {
          element.moveUp();
        } else {
          element.moveDown();
        }
        layer.draw();
      });
    }

    $scope.downloadImage = function () {
      tr.nodes([]);
      layer.draw();
      let dataURL = stage.toDataURL();
      let link = document.createElement('a');
      link.download = 'my-business-card.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    $scope.getFile = function () {
      $scope.progress = 0;
      fileReader.readAsDataUrl($scope.file, $scope).then(function (result) {
        $timeout(() => {
          $scope.images.push({name: 'name', image: result})
        });
      });
    };

    $scope.$on("fileProgress", function(e, progress) {
      $scope.progress = progress.loaded / progress.total;
    });
  }]);
