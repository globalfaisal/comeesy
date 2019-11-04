/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const TabPanel = ({ active, children, index, className }) =>
  active === true ? (
    <div role="tabpanel" id={`tabpanel-${index}`} className={className}>
      {children}
    </div>
  ) : null;

TabPanel.propTypes = {
  active: PropTypes.bool.isRequired,
  children: PropTypes.any,
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
};
export default TabPanel;
