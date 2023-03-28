import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticated: null,
    loading: true,
    user: null
  },

  reducers: {
    REGISTER_SUCCESS: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
        user: null,
      }
    },
    USER_LOADED: (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user
      }
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        user: null,
      }
    },
  }
})

export const { REGISTER_SUCCESS, LOGOUT, USER_LOADED } = authSlice.actions
export default authSlice.reducer


