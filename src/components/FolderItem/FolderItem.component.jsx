import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import FolderItemImageMapping from '../../const/FolderItemImageMapping.const';

const styles = theme => ({
  badgePadding: {
    padding: theme.spacing(0, 2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardFade: {
    opacity: 0.5,
  },
  cardMedia: {
    width: '60%',
    margin: 'auto',
    marginTop: '10px',
    backgroundSize: '80%',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    padding: '4px',
  },
  cardActions: {
    padding: '4px',
  },
  cardButton: {
    margin: 'auto',
  },
});

const FolderItem = ({ fileName, type }) => {
  const classes = makeStyles(styles)();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        image={`${__dirname}/../../assets/folder_item/${FolderItemImageMapping[type] || 'UNKNOWN'}.png`}
        title={fileName}
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="subtitle1" align="center" display="block">
          {fileName}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="large" color="primary" className={classes.cardButton}>
          DOWNLOAD
        </Button>
      </CardActions>
    </Card>
  );
};

FolderItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FolderItem;
