import { ipcRenderer } from 'electron';
import React from 'react';
import { CssBaseline, Popover, List, ListItem, ListItemText } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import MockFolderItems from '../../const/mock/MockFolderItems.const';
import InternalEvent from '../../const/InternalEvent.const';
import TopBar from '../TopBar/TopBar.component';
import Dropzone from '../../components/Dropzone/Dropzone.component';
import Folder from '../../components/Folder/Folder.component';
import Navi from '../Navi/Navi.component';

const FOLDER = {
  LOCAL: 'LOCAL',
  CLOUD: 'CLOUD',
};

const styles = () => ({});

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      currFolder: FOLDER.LOCAL,
      folderItems: {
        [FOLDER.LOCAL]: [],
        [FOLDER.CLOUD]: [],
      },
      popoverAnchor: null,
      currFocusedFileName: '',
    };
    this.switchFolder = this.switchFolder.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
    this.onContextMenu = this.onContextMenu.bind(this);
    this.onPopoverClose = this.onPopoverClose.bind(this);
    this.onFileDroppedIn = this.onFileDroppedIn.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
    this.openFile = this.openFile.bind(this);
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentWillMount() {
    this.registerEvents();
  }

  onContextMenu(popoverAnchor, fileName) {
    this.setPopoverAnchor(popoverAnchor);
    this.setFocusedFileName(fileName);
  }

  onPopoverClose() {
    this.setPopoverAnchor(null);
    this.setFocusedFileName('');
  }

  onFileDroppedIn(fileList) {
    let idx = 0;
    while (fileList[idx] !== undefined) {
      const { path } = fileList[idx];
      ipcRenderer.send(InternalEvent.DROP_FILE, { path });
      idx += 1;
    }
    this.onPopoverClose();
    this.switchFolder(FOLDER.LOCAL);
  }

  setPopoverAnchor(popoverAnchor) {
    this.setState(prevState => ({
      ...prevState,
      popoverAnchor,
    }));
  }

  setFocusedFileName(currFocusedFileName) {
    this.setState(prevState => ({
      ...prevState,
      currFocusedFileName,
    }));
  }

  registerEvents() {
    ipcRenderer.on(InternalEvent.LOCAL_FOLDER_CHANGED, (evt, { folderItems }) => {
      this.setState(prevState => ({
        ...prevState,
        folderItems: {
          ...prevState.folderItems,
          [FOLDER.LOCAL]: folderItems,
        },
      }));
    });
    ipcRenderer.on(InternalEvent.CLOUD_FOLDER_CHANGED, (evt, { folderItems }) => {
      this.setState(prevState => ({
        ...prevState,
        folderItems: {
          ...prevState.folderItems,
          [FOLDER.CLOUD]: folderItems,
        },
      }));
    });
  }

  switchFolder(folder) {
    if (this.state.currFolder === folder) return;
    this.setState(prevState => ({
      ...prevState,
      currFolder: folder,
    }));
  }

  uploadFile(fileName) {
    ipcRenderer.send(InternalEvent.UPLOAD_FILE, { fileName });
    this.onPopoverClose();
  }

  deleteFile(fileName) {
    ipcRenderer.send(InternalEvent.DELETE_FILE, { fileName });
    this.onPopoverClose();
  }

  openFile(fileName) {
    ipcRenderer.send(InternalEvent.OPEN_FILE, { fileName });
    this.onPopoverClose();
  }

  downloadFile(fileName) {
    ipcRenderer.send(InternalEvent.DOWNLOAD_FILE, { fileName });
    this.onPopoverClose();
  }

  render() {
    const { currFolder, folderItems, popoverAnchor, currFocusedFileName } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar />
        <Dropzone onDrop={this.onFileDroppedIn}>
          <Folder
            items={folderItems[currFolder]}
            onContextMenu={this.onContextMenu}
          />
        </Dropzone>
        <Popover
          open={popoverAnchor !== null}
          anchorEl={popoverAnchor}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          onClose={this.onPopoverClose}
          disableRestoreFocus
        >
          <List component="nav">
            {
              currFolder === FOLDER.LOCAL
              && (
                <ListItem button onClick={() => { this.uploadFile(currFocusedFileName); }}>
                  <ListItemText primary="Upload" />
                </ListItem>
              )
            }
            {
              currFolder === FOLDER.LOCAL
              && (
                <ListItem button onClick={() => { this.deleteFile(currFocusedFileName); }}>
                  <ListItemText primary="Delete" />
                </ListItem>
              )
            }
            {
              currFolder === FOLDER.LOCAL
              && (
                <ListItem button onClick={() => { this.openFile(currFocusedFileName); }}>
                  <ListItemText primary="Open" />
                </ListItem>
              )
            }
            {
              currFolder === FOLDER.CLOUD
              && (
                <ListItem button onClick={() => { this.downloadFile(currFocusedFileName); }}>
                  <ListItemText primary="Download" />
                </ListItem>
              )
            }
          </List>
        </Popover>
        <Navi
          actions={[
            {
              label: 'Local',
              iconUrl: `${__dirname}/../../assets/folder.png`,
              onClick: () => { this.switchFolder(FOLDER.LOCAL); },
              isCurr: currFolder === FOLDER.LOCAL,
            },
            {
              label: 'Cloud',
              iconUrl: `${__dirname}/../../assets/icon/icon_grey.png`,
              onClick: () => { this.switchFolder(FOLDER.CLOUD); },
              isCurr: currFolder === FOLDER.CLOUD,
            },
          ]}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
