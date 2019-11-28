/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

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

const PostList = ({ posts = [], loading = false }) => {
  const classes = useStyle();
  if (loading) return <SkeletonCard count={3} />;
  const renderPosts = () => {
    if (!loading && !posts.length)
      return (
        <EmptyData
          text="No posts to show"
          image={imagePath}
          className={classes.emptyPosts}
        />
      );

    return posts.map((post, key) => <Post key={key} post={post} />);
  };
  return <div className="posts">{renderPosts()}</div>;
};
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default PostList;
