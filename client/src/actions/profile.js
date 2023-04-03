import { useDispatch } from "react-redux";
import { SET_AlERT } from "../reducers/alertSlice";
import { LOGOUT } from "../reducers/authSlice";
import api from "../utils/api";
import { useCallback } from 'react';

export const useProfile = () => {

  const dispatch = useDispatch();

  const createProfile = async (formData) => {
    try {
      await api.post('/profile/new', formData);
      // dispatch(SET_AlERT({ token: res.data.token }));
      console.log(formData);

    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(SET_AlERT({ msg: error.msg })));
      }
      console.log(errors)
    }
  };

  const getProfiles = async () => {
    try {
      const res = await api.get('/profile/all');
      if (!res) {
        console.log('Unable to fecth profiles')
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  };


  const getMyProfile = async () => {
    try {
      const res = await api.get('/profile/me');
      if (!res) {
        console.log('Unable to fecth your profile')
      }
      return res.data;

    } catch (err) {
      console.log(err)
    }
  };

  const getProfile = async (userId) => {
    try {
      const res = await api.get(`profile/user/${userId}`)
      if (!res) {
        console.log('Unable to fetch profile')
      }
      return res.data;

    } catch (error) {
      console.log(error);

    }
  }

  const removeProfile = useCallback(async (id) => {
    try {
      const res = await api.delete(`/profile/${id}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);


  const updateProfile = async (formData, id) => {
    try {

      console.log(formData)
      console.log(id)
      await api.post(`/profile/edit/${id}`, formData);
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


  const addEducation = async (formData) => {
    try {
      await api.post(`/profile/education/new`, formData);
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
      console.log(error);
      return false;
    }
  }

  const removeEducation = async (eduId) => {
    try {
      await api.delete(`/profile/education/${eduId}`);
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
      return false;
    }
  }

  const addExperience = async (profileId, formData) => {
    try {
      await api.post(`/profile/${profileId}/experience/new`, formData);
      console.log(formData)
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
      return false;
    }
  }

  const removeExperience = async (profileId, expId) => {
    try {
      await api.delete(`/profile/${profileId}/experience /${expId}`);
      return true
    } catch (error) {
      console.log(error)
      // dispatch(LOGOUT());
      return false;
    }
  }


  return {
    createProfile,
    getProfiles,
    getMyProfile,
    getProfile,
    removeProfile,
    updateProfile,
    addEducation,
    removeEducation,
    addExperience,
    removeExperience
  };
};
