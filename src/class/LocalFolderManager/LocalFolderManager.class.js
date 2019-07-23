import Chokidar from 'chokidar';
import Path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { ipcMain } from 'electron';
import UiEvent from '../UiClient/UiEvent.const';
import InternalEvent from '../../const/InternalEvent.const';
import EventEmitter from '../EventEmitter/EventEmitter.class';
import AppStore from '../AppStore/AppStore.class';


class LocalFolderManager {
  constructor() {
    this.fileDir = '';
    this.files = {};
  }

  start() {
    this.registerEvents();
  }

  registerEvents() {
    EventEmitter.register(InternalEvent.WEB_CONTENT_READY, this.inFormFolderChanges.bind(this));
    EventEmitter.register(UiEvent.SERVER.GIVE_FILE_DIR, this.onGiveFileDir.bind(this));
    ipcMain.on(InternalEvent.OPEN_FILE, (evt, { fileName }) => {
      this.openFile(fileName);
    });
  }

  inFormFolderChanges() {
    AppStore.appWindow.webContents.send(
      InternalEvent.LOCAL_FOLDER_CHANGED,
      {
        folderItems: Object.values(this.files),
      });
  }

  onGiveFileDir({ fileDir }) {
    this.fileDir = Path.resolve(fileDir);
    Chokidar
      .watch(this.fileDir, { ignored: /(^|[/\\])\../, persistent: true })
      .on('add', this.onFileAdded.bind(this))
      // eslint-disable-next-line max-len
      // .on('change', (f) => { console.log(`INFO [LocalFolderManager]: File ${f} has been changed`); })
      .on('unlink', this.onFileDeleted.bind(this))
      .on('error', (err) => { console.log(`ERROR [LocalFolderManager]: ${err}`); });
  }

  onFileAdded(path) {
    const fileName = `${Path.basename(path)}`;
    const type = (Path.extname(path) || '.').substr(1).toLowerCase();
    this.files[fileName] = { fileName, type };
    this.inFormFolderChanges();
  }

  onFileDeleted(path) {
    const fileName = `${Path.basename(path)}`;
    delete this.files[fileName];
    this.inFormFolderChanges();
  }

  openFile(fileName) {
    const path = Path.join(this.fileDir, fileName);
    if (!fs.existsSync(path)) return;
    let cmd = 'open';
    switch (process.platform) {
      case 'darwin':
        cmd = 'open';
        break;
      case 'win32':
        cmd = 'start';
        break;
      case 'win64':
        cmd = 'start';
        break;
      default:
        cmd = 'xdg-open';
        break;
    }
    exec(`${cmd} ${path.replace(/ /g, '\\ ')}`);
  }
}

export default new LocalFolderManager();
