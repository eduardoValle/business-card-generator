angular.module('myApp')
  .factory('konvasFactory', ['$timeout', function ($timeout) {
    return {

      addTextElement: function (layer, text) {
        let textElement = new Konva.Text({
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
        textElement.tempText = text;
        layer.add(textElement);
        layer.draw();
        return textElement;
      },

      addClickOnElementEvents: function (stage, tr, layer) {

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
      }
    };
  }]);
