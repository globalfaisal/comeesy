/* -- libs -- */
import React from 'react';
import PropTypes from 'prop-types';

/* -- components -- */
import PostItem from '../PostItem/PostItem';
import SkeletonCard from '../UI/SkeletonCard';
import EmptyData from '../UI/EmptyData';

/* -- images -- */
import imagePath from '../../assets/images/empty-data.svg';

const PostList = ({ posts = [], loading = false }) => {
  const renderPosts = () => {
    if (loading) return <SkeletonCard count={3} />;
    if (!loading && !posts.length)
      return <EmptyData text="No Posts Yet" image={imagePath} />;

    return posts.map(post => <PostItem key={post.postId} post={post} />);
  };
  return <div className="posts">{renderPosts()}</div>;
};
PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};
export default PostList;
