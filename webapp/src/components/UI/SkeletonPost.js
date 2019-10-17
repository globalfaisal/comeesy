/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

/* -- styles -- */
const useStyle = makeStyles(theme => ({
  skeleton: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
}));

const SkeletonPost = ({ show = 1 }) => {
  const classes = useStyle();
  const renderContent = () => {
    let counter = 0;
    const post = [];

    while (counter < show) {
      post.push(
        <Card className={classes.skeleton} key={counter}>
          <CardHeader
            avatar={<Skeleton variant="circle" width={40} height={40} />}
            title={
              <Fragment>
                <Skeleton height={6} width={120} />
              </Fragment>
            }
            subheader={<Skeleton height={4} width={40} />}
          />
          <CardContent>
            <Skeleton height={6} />
            <Skeleton height={6} width="80%" />
            <Skeleton height={6} width="60%" />
          </CardContent>
        </Card>
      );
      counter += 1;
    }
    return post;
  };
  return <Fragment>{renderContent()}</Fragment>;
};

SkeletonPost.propTypes = {
  show: PropTypes.number.isRequired,
};
export default SkeletonPost;
