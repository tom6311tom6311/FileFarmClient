import { ipcRenderer } from 'electron';
import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
// import MockFolderItems from '../../const/mock/MockFolderItems.const';
import InternalEvent from '../../const/InternalEvent.const';
import TopBar from '../TopBar/TopBar.component';
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
    };
    this.switchFolder = this.switchFolder.bind(this);
    this.registerEvents = this.registerEvents.bind(this);
  }

  componentWillMount() {
    this.registerEvents();
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
  }

  switchFolder(folder) {
    if (this.state.currFolder === folder) return;
    this.setState(prevState => ({
      ...prevState,
      currFolder: folder,
    }));
  }

  render() {
    const { currFolder, folderItems } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar />
        <Folder
          items={folderItems[currFolder]}
        />
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
