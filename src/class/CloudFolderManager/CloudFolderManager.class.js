import UiEvent from '../UiClient/UiEvent.const';
import InternalEvent from '../../const/InternalEvent.const';
import EventEmitter from '../EventEmitter/EventEmitter.class';
import AppStore from '../AppStore/AppStore.class';


class CloudFolderManager {
  constructor() {
    this.files = {};
  }

  start() {
    this.registerEvents();
  }

  registerEvents() {
    EventEmitter.register(InternalEvent.WEB_CONTENT_READY, this.inFormFolderChanges.bind(this));
    EventEmitter.register(UiEvent.SERVER.ALL_UPLOADED_FILES, this.onReceiveAllUploadedFiles.bind(this));
    EventEmitter.register(UiEvent.SERVER.FILE_UPLOADED, this.onFileUploaded.bind(this));
  }

  inFormFolderChanges() {
    AppStore.appWindow.webContents.send(
      InternalEvent.CLOUD_FOLDER_CHANGED,
      {
        folderItems: Object.values(this.files),
      });
  }

  onReceiveAllUploadedFiles({ allUploadedFiles }) {
    console.log(allUploadedFiles);
    allUploadedFiles.forEach(({ fileName }) => {
      const type = (fileName || '.').substr(fileName.lastIndexOf('.') + 1).toLowerCase();
      this.files[fileName] = { fileName, type };
    });
    this.inFormFolderChanges();
  }

  onFileUploaded({ fileName }) {
    console.log(fileName);
    const type = (fileName || '.').substr(fileName.lastIndexOf('.') + 1).toLowerCase();
    this.files[fileName] = { fileName, type };
    this.inFormFolderChanges();
  }
}

export default new CloudFolderManager();
