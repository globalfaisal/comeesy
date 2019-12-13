/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- components -- */
import TypographyTruncate from '../../TypographyTruncate/TypographyTruncate';
import CommentPostIcon from '../CommentPostIcon/CommentPostIcon';
import LikePostIcon from '../LikePostIcon/LikePostIcon';

/* -- utils -- */
import { formatDateToRelTime } from '../../../utils/helperFns';

/* -- mui -- */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

/* -- styles -- */
import useStyles from './styles';

const PostCard = ({ post }) => {
  const classes = useStyles();
  return (
    <div className={classes.post}>
      <Card>
        <CardHeader
          avatar={
            <Avatar
              alt={post.user.username}
              src={post.user.imageUrl}
              component={Link}
              to={`/u/${post.user.username}`}
              className={classes.avatar}
            />
          }
          title={
            <Fragment>
              <Typography
                component={Link}
                to={`/u/${post.user.username}`}
                variant="subtitle1"
                color="primary"
                className={classes.title}
              >{`${post.user.name}`}</Typography>
              <span>{`@${post.user.username}`}</span>
            </Fragment>
          }
          subheader={
            <Typography
              variant="caption"
              color="textSecondary"
              className={classes.createdAt}
            >
              {formatDateToRelTime(post.createdAt)}
            </Typography>
          }
        />
        <CardContent>
          <TypographyTruncate
            variant="body1"
            color="textSecondary"
            line={3}
            more="Show More"
          >
            {post.body}
          </TypographyTruncate>
        </CardContent>
        <CardActions disableSpacing>
          <LikePostIcon post={post} />
          <CommentPostIcon post={post} />
        </CardActions>
      </Card>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
};
export default PostCard;
