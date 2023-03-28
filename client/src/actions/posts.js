import { useDispatch } from "react-redux";
import { SET_AlERT } from "../reducers/alertSlice";
import { LOGOUT } from "../reducers/authSlice";
import api from "../utils/api";
import { useCallback } from 'react';

export const usePost = () => {

  const dispatch = useDispatch();

  const createPost = async (formData) => {
    try {
      await api.post('/articles/new', formData);
      // dispatch(REGISTER_SUCCESS({ token: res.data.token }));
      return true

    } catch (err) {

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      dispatch(LOGOUT());
      return false;
    }
  };

  const getPosts = async () => {
    try {
      const res = await api.get('/articles/');
      if (!res) {
        console.log('Unable to fecth posts')
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  };

  const removePost = useCallback(async (id) => {
    try {
      const res = await api.delete(`/articles/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);


  const updatePost = async (formData, id) => {
    try {

      console.log(formData)
      console.log(id)
      await api.put(`/articles/edit/${id}`, formData);
      // dispatch(REGISTER_SUCCESS({ token: res.data.token }));
      return true

    } catch (err) {

      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      dispatch(LOGOUT());
      return false;
    }
  };

  const likePost = async (id) => {
    try {
      await api.put(`/articles/${id}/like`);
      return true

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      dispatch(LOGOUT());
      return false;
    }
  };

  const addComment = async (postId, comment) => {
    try {
      await api.post(`/articles/${postId}/comment/new`, comment);
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
      return false;
    }
  }

  const deleteComment = async (postId, commentId) => {
    try {
      await api.delete(`/articles/${postId}/comment/${commentId}`);
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
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
    deleteComment
  };
};
