import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import FolderItem from '../FolderItem/FolderItem.component';

const styles = theme => ({
  cardGrid: {
    height: '514px',
    overflow: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const Folder = ({ items }) => {
  const classes = makeStyles(styles)();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={2}>
        {items.map(({ fileName, type, uploaded }) => (
          <Grid item key={fileName} xs={12} sm={3} md={4}>
            <FolderItem
              fileName={fileName}
              type={type}
              uploaded={uploaded}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

Folder.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    fileName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    uploaded: PropTypes.bool.isRequired,
  })),
};

Folder.defaultProps = {
  items: [],
};

export default Folder;
