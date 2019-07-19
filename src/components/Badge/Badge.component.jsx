import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ children, hide }) => (
  <div className={`badge ${hide ? 'hide' : ''}`}>
    {children}
  </div>
);

Badge.propTypes = {
  children: PropTypes.string,
  hide: PropTypes.bool,
};

Badge.defaultProps = {
  children: '',
  hide: false,
};

export default Badge;
