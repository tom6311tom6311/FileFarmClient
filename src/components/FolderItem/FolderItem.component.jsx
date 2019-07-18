import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import FolderItemImageMapping from '../../const/FolderItemImageMapping.const';

const styles = () => ({
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

const FolderItem = ({ fileName, type, uploaded }) => {
  const classes = makeStyles(styles)();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={[classes.cardMedia, uploaded ? classes.cardFade : undefined]}
        image={`${__dirname}/../../assets/folder_item/${FolderItemImageMapping[type] || 'UNKNOWN'}.png`}
        title={fileName}
      />
      <CardContent className={[classes.cardContent, uploaded ? classes.cardFade : undefined]}>
        <Typography gutterBottom variant="subtitle1" align="center" display="block">
          {fileName}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        {
          uploaded ?
          (
            <Button size="large" color="primary" className={classes.cardButton}>
              DOWNLOAD
            </Button>
          )
          :
          (
            <Button size="large" color="secondary" className={classes.cardButton}>
              UPLOAD
            </Button>
          )
        }

        
      </CardActions>
    </Card>
  );
};

FolderItem.propTypes = {
  fileName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  uploaded: PropTypes.bool.isRequired,
};

export default FolderItem;
