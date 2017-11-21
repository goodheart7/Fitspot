const config = require('@config');



class FitSpotSocketClient{

  constructor(authToken){
    this.authToken = authToken
    this.ws = {}
  }
  init(){
     ws = new WebSocket(config.wsUrl);
    ws.onopen = () => {
      // connection opened
      ws.send(JSON.stringify({
        type: 'auth',
        token: this.authToken
      })); // send a message
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log('ws message: ' + e.data);

      var data = JSON.parse(e.data)

      if(data.type === 'ping'){
        console.log('sending pong')
        ws.send(JSON.stringify({
          type: 'pong'
        }));
      }

      else if(data.type === 'message'){
        
      }

    };

    ws.onerror = (e) => {
      // an error occurred
      console.log('ws error: ' + e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
  }
  close(){
    ws.close();
  }
}
export default FitSpotSocketClient
