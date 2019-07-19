import Chokidar from 'chokidar';
import Path from 'path';
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
    const type = (Path.extname(path) || '.').substr(1);
    this.files[fileName] = { fileName, type };
    this.inFormFolderChanges();
  }

  onFileDeleted(path) {
    const fileName = `${Path.basename(path)}`;
    delete this.files[fileName];
    this.inFormFolderChanges();
  }
}

export default new LocalFolderManager();
