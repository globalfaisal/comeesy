/* -- libs -- */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Trancate from 'react-text-truncate';
import _ from 'lodash';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';
/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  more: {
    color: theme.palette.secondary.dark,
    fontWeight: 500,
    marginLeft: 3,
    cursor: 'pointer',
  },
}));

const TypographyTruncate = props => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const { children, line = 5, more = 'Read more' } = props;

  return (
    <Typography component="div" {..._.omit(props, ['line', 'more'])}>
      <Trancate
        text={children}
        line={!expanded && line}
        element="span"
        textTruncateChild={
          <Typography
            variant="caption"
            component="span"
            onClick={() => setExpanded(true)}
            className={classes.more}
          >
            {more}
          </Typography>
        }
      />
    </Typography>
  );
};

TypographyTruncate.propTypes = {
  children: PropTypes.string.isRequired,
  line: PropTypes.number,
  more: PropTypes.string,
};
export default TypographyTruncate;
