import WebSocket from 'ws';
import AppConfig from '../../const/AppConfig.const';
import EventEmitter from '../EventEmitter/EventEmitter.class';

class UiClient {
  constructor() {
    this.ws = null;
  }

  start(serverPort) {
    const errorCallback = (err) => {
      console.log(`ERROR [UiClient]: ${err}`);
      setTimeout(() => {
        this.start(serverPort);
      }, AppConfig.RETRY_TIMEOUT);
    };
    try {
      this.ws = new WebSocket(`http://localhost:${serverPort}/`);
      this.ws.on('open', () => {
        this.ws.on('message', (msg) => {
          if (typeof msg !== 'string') return;
          const { event, message } = JSON.parse(msg);
          if (event === undefined || message === undefined) return;
          EventEmitter.emit(event, message);
        });
      });
      this.ws.on('error', errorCallback);
    } catch (err) {
      errorCallback(err);
    }
  }
}

export default UiClient;
