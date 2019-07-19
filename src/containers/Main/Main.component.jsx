import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MockFolderItems from '../../const/mock/MockFolderItems.const';
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
      folderItems: MockFolderItems.LOCAL,
    };
    this.switchFolder = this.switchFolder.bind(this);
  }

  switchFolder(folder) {
    if (this.state.currFolder === folder) return;
    this.setState(prevState => ({
      ...prevState,
      currFolder: folder,
      folderItems: MockFolderItems[folder],
    }));
  }

  render() {
    const { currFolder, folderItems } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar />
        <Folder
          items={folderItems}
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
