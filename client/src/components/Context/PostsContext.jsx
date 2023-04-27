import React, { createContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePost } from '../../actions/posts';

const PostContext = createContext('');

const PostContextProvider = ({ userId, children }) => {
  const { user_id } = useParams();
  const { getConnectedPosts, removePost, getUserPosts } = usePost();
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);

  const fetchData = async (userId) => {
    let fetchedPosts = await getConnectedPosts();
    setPosts(fetchedPosts?.articles);
    if (userId) {
      let fetchedUserPosts = await getUserPosts(userId);
      setUserPosts(fetchedUserPosts?.articles);
    }
  };

  const handleRemovePost = async (id) => {
    await removePost(id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, [removePost, user_id]);

  return (
    <PostContext.Provider
      value={{ posts, userPosts, handleRemovePost, fetchData }}
    >
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostContextProvider };
