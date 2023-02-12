var clipboard = new ClipboardJS('#copy-button', {
    target: function() {
      return document.querySelector('#markdown');
    }
  });
  
  clipboard.on('success', function(e) {
    console.log('Copiado con éxito: ', e.text);
    e.clearSelection();
  });
  
  clipboard.on('error', function(e) {
    console.error('Error al copiar: ', e);
  });
  