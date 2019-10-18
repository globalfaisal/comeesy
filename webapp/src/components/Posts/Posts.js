/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- components -- */
import Post from './Post';
import PostSkeleton from '../UI/PostSkeleton';

const Posts = ({ posts = [], loading = false }) => {
  if (loading) return <PostSkeleton show={5} />;
  const renderPosts = () => {
    if (!loading && posts.length) {
      return posts.map((post, key) => <Post key={key} post={post} />);
    }
  };
  return <div className="posts">{renderPosts()}</div>;
};
Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default Posts;
