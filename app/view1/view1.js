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

      if (!e.target.attrs.text && !e.target.attrs.image) {
        return;
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = tr.nodes().indexOf(e.target) >= 0;
      tr.moveToTop();

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        tr.nodes([e.target]);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(e.target), 1);
        tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = tr.nodes().concat([e.target]);
        tr.nodes(nodes);
      }
      layer.draw();
    });


    /** ADICIONANDO TEXTO **/
    $scope.addText = function () {
      let text = 'Novo Texto';
      let newText = new Konva.Text({
        x: 50,
        y: 60,
        text: text,
        fontSize: 20,
        fontStyle: '',
        draggable: true,
        fill: '#000000',
        fontDecoration: '',
        fontFamily: 'Arial',
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

    /** MOVER ITEM PARA A CAMADA ACIMA **/
    $scope.moveToBack = function (element) {
      element.moveDown();
      layer.draw();
      console.log(layer)
    }

    /** REMOVER ELEMENTO **/
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
        console.log(element.attrs.draggable)
      });
    }

    function adicionarElemento(element) {
      $timeout(() => {
        $scope.newCard.push(element);
      });
    }
  }]);
