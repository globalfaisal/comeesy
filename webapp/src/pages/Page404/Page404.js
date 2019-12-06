/* -- libs -- */
import React from 'react';
import { Link } from 'react-router-dom';

/* -- utils-- */
import history from '../../utils/history';

/* -- mui -- */
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/KeyboardBackspace';

/* -- images -- */
import image404 from '../../assets/images/404.svg';

/* -- styles -- */
import useStyles from './styles';

const Page404 = () => {
  const classes = useStyles();
  return (
    <div className={classes.page404}>
      <div className={classes.content}>
        <img src={image404} alt="404" className={classes.image} />
        <div>
          <Typography
            variant="h4"
            color="textPrimary"
            className={classes.title}
          >
            You weren't supposed to <br />
            find this place.
          </Typography>
        </div>
        <Typography
          variant="body1"
          color="textSecondary"
          className={classes.subtitle}
        >
          We don't have a special name for this place. Some might refer to this
          as a four-o-four page, but we like to call it the place where
          broken-link rests.
        </Typography>
        <Button
          color="primary"
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIcon />}
        >
          GO BACK
        </Button>
      </div>
    </div>
  );
};

export default Page404;
