import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => <div className="post-item">{post.body}</div>;

Post.propTypes = {
  post: PropTypes.object.isRequired,
};
export default Post;
