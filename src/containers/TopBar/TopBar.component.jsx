import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { Icon, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    marginRight: theme.spacing(2),
    height: '36px',
    width: '36px',
  },
  iconImage: {
    height: '100%',
  },
});

class TopBar extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="relative" >
        <Toolbar>
          <Icon className={classes.icon}>
            <img
              className={classes.iconImage}
              src={`${__dirname}/../../assets/icon/icon.png`}
              alt="logo"
            />
          </Icon>
          <Typography variant="h6" color="inherit" noWrap>
            FileFarm Client
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

TopBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(TopBar);
