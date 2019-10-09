/* -- libs -- */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

/* -- actions -- */
import { fetchPosts } from '../../actions/postsActions';

/* -- components -- */
import Post from './Post';

const Posts = () => {
  const dispatch = useDispatch();
  const posts = Object.values(useSelector(state => state.posts));

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const renderPosts = () => {
    // TODO: extract loading logic to a seprate component
    if (!posts || !posts.length) return <p>Loading...</p>;
    return (
      <div className="posts">
        {posts.map((post, key) => (
          <Post key={key} post={post} />
        ))}
      </div>
    );
  };
  return renderPosts();
};

export default Posts;
