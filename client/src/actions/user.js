import { useDispatch, useSelector } from "react-redux";
import { SET_AlERT } from "../reducers/alertSlice";
import { LOGOUT, REGISTER_SUCCESS, USER_LOADED } from "../reducers/authSlice";
import api from "../utils/api";
import setAuthToken from "../utils/setAuthToken";
const itn = require('../constants/constants.json')

// const dispatch = useDispatch();

export const getUsers = async () => {
  try {
    const res = await api.get('/users/all');
    return res.data.users;

  } catch (err) {
    console.log(err)
  }
};

export const RequestConnection = async (userId) => {
  try {
    const res = await api.put('/users/send-request', { user: userId })
    console.log(res);

  } catch (error) {
    console.log(error)
  }
}

export const CancelRequest = async (userId) => {
  try {
    const res = await api.put('/users/cancel-request', { user: userId })
    console.log(res);

  } catch (error) {
    console.log(error)
  }
}

export const AcceptRequest = async (userId) => {
  try {
    const res = await api.put('/users/accept-request', { user: userId })
    console.log(res);

  } catch (error) {
    console.log(error)
  }
}


export const getSuggestedConnections = async () => {
  try {
    const res = await api.get('/users/suggested-users');
    return res.data.users;

  } catch (err) {
    console.log(err)
  }
};

