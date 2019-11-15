/* -- libs -- */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    '&:hover': {
      backgroundColor: theme.palette.colors.greylight,
    },
  },
  summary: {
    overflowX: 'hidden',
  },
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actions: {
    padding: '8px 24px',
  },
}));

const ExpandPanel = props => {
  const classes = useStyles();

  const { id, summary, children, action } = props;

  return (
    <ExpansionPanel
      square
      TransitionProps={{ unmountOnExit: true }}
      className={classes.root}
    >
      <ExpansionPanelSummary
        aria-controls={`${id}-panel-content`}
        id={`${id}-panel-header`}
        expandIcon={<ExpandMoreIcon fontSize="small" />}
        className={classes.summary}
      >
        {summary}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
      {action && (
        <ExpansionPanelActions className={classes.actions}>
          {action}
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
};
ExpandPanel.propTypes = {
  id: PropTypes.string.isRequired,
  summary: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  action: PropTypes.node,
};

export default ExpandPanel;
