/* -- libs -- */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

/* -- utils -- */
import { formatDateToRelTime } from '../../utils/helpers/dates';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

/* -- styles -- */
const useStyle = makeStyles(theme => ({
  post: {
    '&:not(:first-child)': {
      marginTop: theme.spacing(2),
    },
  },
  title: {
    textTransform: 'capitalize',
    marginRight: 3,
    '& + span': {
      color: theme.palette.colors.steelblue,
      fontWeight: 300,
    },
  },
  createdAt: {
    display: 'block',
    marginTop: -theme.spacing(0.5),
  },
}));

const Post = ({ post }) => {
  const classes = useStyle();
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
            />
          }
          title={
            <Fragment>
              <Typography
                component={Link}
                to={`/u/${post.user.username}`}
                variant="subtitle2"
                color="primary"
                className={classes.title}
              >{`${post.user.firstname} ${post.user.lastname}`}</Typography>
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
          // action={
          //   <IconButton aria-label="actions">
          //     <MoreHorizIcon />
          //   </IconButton>
          // }
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
export default Post;
