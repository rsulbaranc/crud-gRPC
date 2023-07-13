
// Escucha mensajes del hilo principal
self.onmessage = function(event) {
    const requestData = event.data;
    
    // Procesa los datos recibidos
    const result = processData(requestData);
    
    // Envía el resultado al hilo principal
    self.postMessage(result);
  };
  
  function processData(data) {
    client.SayWelcome({ name: 'Luke Skywalker' }, function (err, response) {console.log('Message:', response.message);});
  
    return processedData;
  }
  