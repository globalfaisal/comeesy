/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

/* -- components -- */
import Post from './Post';
import SkeletonCard from '../UI/SkeletonCard';
import EmptyData from '../UI/EmptyData';

/* -- mui -- */
import { makeStyles } from '@material-ui/core/styles';

/* -- images -- */
import imagePath from '../../assets/images/empty-data.svg';

const useStyle = makeStyles(theme => ({
  emptyPosts: {
    height: 300,
  },
}));

const PostList = ({ posts = [], likes = [], loading = false }) => {
  const classes = useStyle();
  const handlePostLike = id => {
    console.log(id);
  };
  const renderPosts = () => {
    if (loading) return <SkeletonCard count={3} />;
    if (!loading && !posts.length)
      return (
        <EmptyData
          text="No posts to show"
          image={imagePath}
          className={classes.emptyPosts}
        />
      );

    return posts.map((post, key) => {
      const liked = likes.some(like => like.postId === post.postId);
      return (
        <Post key={key} post={post} liked={liked} onLike={handlePostLike} />
      );
    });
  };
  return <div className="posts">{renderPosts()}</div>;
};
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  likes: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default PostList;
