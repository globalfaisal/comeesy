/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ active, children, className }) =>
  active === true ? <div className={className}>{children}</div> : null;

TabPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.any,
};
export default TabPanel;
