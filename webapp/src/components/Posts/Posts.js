/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- components -- */
import Post from './Post';
import PostSkeleton from '../UI/PostSkeleton';
import EmptyData from '../UI/EmptyData';

/* -- images -- */
import imagePath from '../../assets/images/empty-data.svg';

const Posts = ({ posts = [], loading = false }) => {
  if (loading) return <PostSkeleton show={3} />;
  const renderPosts = () => {
    if (!loading && posts.length) {
      return posts.map((post, key) => <Post key={key} post={post} />);
    }
    return <EmptyData text="No posts to show" image={imagePath} />;
  };
  return <div className="posts">{renderPosts()}</div>;
};
Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default Posts;
