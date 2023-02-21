import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
  name: 'alert',
  initialState: {
    value: false,
    text: ''
  },
  reducers: {
    SET_AlERT: (state) => {
      state.text = 'Hello this is toast'
    },
    REMOVE_ALERT: (state) => {
      state.value = false
    },
    SET_ALERT_TEXT: (state) => {
      state.text = 'Hello toast is here'
    },
    REMOVE_ALERT_TEXT: (state) => {
      state.text = ''
    }
  },
})

export const { SET_AlERT, REMOVE_ALERT, SET_ALERT_TEXT, REMOVE_ALERT_TEXT } = alertSlice.actions
export default alertSlice.reducer


