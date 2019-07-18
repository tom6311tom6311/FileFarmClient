import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import TopBar from '../TopBar/TopBar.component';
import Folder from '../../components/Folder/Folder.component';
import MockFolderItems from '../../const/mock/MockFolderItems.const';


const styles = () => ({});

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <TopBar />
        <Folder items={MockFolderItems} />
      </React.Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Main);
