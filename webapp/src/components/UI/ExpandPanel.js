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
  details: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  actions: {
    padding: '8px 24px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.colors.steelblue,
  },
}));

const ExpandPanel = props => {
  const classes = useStyles();
  const [expandedPanel, setExpandedPanel] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);
  };

  const { id, heading, secondaryHeading, children, actionContent } = props;

  return (
    <ExpansionPanel
      square
      expanded={expandedPanel === `${id}-panel`}
      onChange={handleChange(`${id}-panel`)}
      TransitionProps={{ unmountOnExit: true }}
      className={classes.root}
    >
      <ExpansionPanelSummary
        aria-controls={`${id}-panel-content`}
        id={`${id}-panel-header`}
        expandIcon={<ExpandMoreIcon fontSize="small" />}
      >
        <Typography className={classes.heading}>{heading}</Typography>
        {secondaryHeading && (
          <Typography className={classes.secondaryHeading}>
            {secondaryHeading}
          </Typography>
        )}
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {children}
      </ExpansionPanelDetails>
      {actionContent && (
        <ExpansionPanelActions className={classes.actions}>
          {actionContent}
        </ExpansionPanelActions>
      )}
    </ExpansionPanel>
  );
};
ExpandPanel.propTypes = {
  id: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  secondaryHeading: PropTypes.string,
  children: PropTypes.any.isRequired,
  actionContent: PropTypes.node,
};

export default ExpandPanel;
