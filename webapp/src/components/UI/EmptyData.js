/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyle = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    minHeight: 200,
  },
  media: {
    width: 80,
    height: 80,
  },
  text: {
    fontWeight: 200,
  },
}));

const EmptyData = ({ text, image, className }) => {
  const classes = useStyle();
  return (
    <div className={clsx(classes.root, className)}>
      {image && <img src={image} alt={text} className={classes.media} />}
      <Typography
        variant="body1"
        color="textSecondary"
        className={classes.text}
      >
        {text}
      </Typography>
    </div>
  );
};

EmptyData.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default EmptyData;
