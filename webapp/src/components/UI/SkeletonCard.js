/* -- libs -- */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

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

const SkeletonCard = ({ count = 1, header = true, className }) => {
  const classes = useStyle();
  const renderContent = () => {
    let num = 0;
    const post = [];

    while (num < count) {
      post.push(
        <Card className={clsx(classes.skeleton, className)} key={num}>
          {header && (
            <CardHeader
              avatar={<Skeleton variant="circle" width={40} height={40} />}
              title={
                <Fragment>
                  <Skeleton height={6} width={120} />
                </Fragment>
              }
              subheader={<Skeleton height={4} width={40} />}
            />
          )}
          <CardContent>
            <Skeleton height={6} width="60" />
            <Skeleton height={6} width="60%" />
            <Skeleton height={6} width="40%" />
          </CardContent>
        </Card>
      );
      num += 1;
    }
    return post;
  };
  return <Fragment>{renderContent()}</Fragment>;
};

SkeletonCard.propTypes = {
  count: PropTypes.number,
  header: PropTypes.bool,
  className: PropTypes.string,
};
export default SkeletonCard;
