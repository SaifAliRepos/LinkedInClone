import { useDispatch } from "react-redux";
import { SET_AlERT } from "../reducers/alertSlice";
import api from "../utils/api";
import { useCallback } from 'react';
const itn = require('../constants/constants.json')

export const usePost = () => {

  const dispatch = useDispatch();

  const createPost = async (formData) => {
    try {
      await api.post('/articles/new', formData);
      dispatch(SET_AlERT({ msg: itn.POST_CREATED }));
      return true

    } catch (err) {

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      return false;
    }
  };

  const getPosts = async () => {
    try {
      const res = await api.get('/articles/');
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }));
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  };

  const getConnectedPosts = async (userId) => {
    try {
      const res = await api.get(`/articles/connected-articles`);
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }));
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  }

  const getUserPosts = async (userId) => {
    try {
      const res = await api.get(`/articles/user/${userId}/recent_activity/posts`);
      if (!res) {
        dispatch(SET_AlERT({ msg: itn.POST_NOT_LOADED }));
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  }

  const removePost = useCallback(async (id) => {
    try {
      await api.delete(`/articles/${id}`);
      dispatch(SET_AlERT({ msg: itn.POST_DELETED }));
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const updatePost = async (formData, id) => {
    try {
      await api.put(`/articles/edit/${id}`, formData);
      dispatch(SET_AlERT({ msg: itn.POST_UPDATED }));

    } catch (err) {

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
    }
  };

  const likePost = async (postId) => {
    try {
      await api.put(`/articles/${postId}/like`);
      return true

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      return false;
    }
  };

  const addComment = async (postId, comment) => {
    try {
      await api.post(`/articles/${postId}/comment/new`, comment);
      return true
    } catch (error) {
      dispatch(SET_AlERT({ msg: error.msg }))
      return false;
    }
  }

  const deleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/articles/${postId}/comment/${commentId}`);
      return true
    } catch (error) {
      dispatch(SET_AlERT({ msg: error.msg }))
      return false;
    }
  }




  return {
    createPost,
    getPosts,
    removePost,
    updatePost,
    likePost,
    addComment,
    deleteComment,
    getConnectedPosts,
    getUserPosts,
  };
};
