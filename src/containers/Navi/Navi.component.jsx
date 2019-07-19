import React from 'react';
import PropTypes from 'prop-types';
import { BottomNavigation, BottomNavigationAction, Icon } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  icon: {
    margin: theme.spacing(0.5),
  },
  iconImage: {
    height: '100%',
  },
  iconImageCurr: {
    filter: 'sepia(100%) hue-rotate(190deg) saturate(500%)',
  },
  labelCurr: {
    color: 'rgb(115,174,255)',
  },
});

class Navi extends React.Component {
  render() {
    const { classes, actions } = this.props;
    return (
      <BottomNavigation showLabels>
        {
          actions.map(({ label, iconUrl, onClick, isCurr }) => (
            <BottomNavigationAction
              key={label}
              label={
                <span className={`${isCurr ? classes.labelCurr : ''}`}>{label}</span>
              }
              icon={
                <Icon className={classes.icon}>
                  <img
                    className={`${classes.iconImage} ${isCurr ? classes.iconImageCurr : ''}`}
                    src={iconUrl}
                    alt={label}
                  />
                </Icon>
              }
              onClick={onClick}
            />
          ))
        }
      </BottomNavigation>
    );
  }
}

Navi.propTypes = {
  classes: PropTypes.object.isRequired,
  actions: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    iconUrl: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    isCurr: PropTypes.bool,
  })).isRequired,
};

export default withStyles(styles, { withTheme: true })(Navi);
