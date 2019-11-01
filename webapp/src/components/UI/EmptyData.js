/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
const useStyle = makeStyles(theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: 100,
    height: 100,
  },
}));

const EmptyData = ({ text, image, className }) => {
  const classes = useStyle();
  return (
    <Card className={clsx(classes.card, className)} elevation={1}>
      <CardContent>
        <CardMedia
          component="img"
          src={image}
          title={text}
          className={classes.media}
        />
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          className={classes.text}
          align="center"
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
};

EmptyData.propTypes = {
  text: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  className: PropTypes.string,
};
export default EmptyData;
