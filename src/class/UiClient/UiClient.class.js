import { ipcMain } from 'electron';
import WebSocket from 'ws';
import AppConfig from '../../const/AppConfig.const';
import EventEmitter from '../EventEmitter/EventEmitter.class';
import UiEvent from './UiEvent.const';
import InternalEvent from '../../const/InternalEvent.const';

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
    this.registerInternalEventListeners();
  }

  registerInternalEventListeners() {
    ipcMain.on(InternalEvent.UPLOAD_FILE, (evt, { fileName }) => {
      this.uploadFile(fileName);
    });
    ipcMain.on(InternalEvent.DELETE_FILE, (evt, { fileName }) => {
      this.deleteFile(fileName);
    });
    ipcMain.on(InternalEvent.DOWNLOAD_FILE, (evt, { fileName }) => {
      this.downloadFile(fileName);
    });
  }

  uploadFile(fileName) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: UiEvent.CLIENT.UPLOAD_FILE,
        message: { fileName },
      }));
    }
  }

  deleteFile(fileName) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: UiEvent.CLIENT.DELETE_FILE,
        message: { fileName },
      }));
    }
  }

  downloadFile(fileName) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify({
        event: UiEvent.CLIENT.DOWNLOAD_FILE,
        message: { fileName },
      }));
    }
  }
}

export default UiClient;
