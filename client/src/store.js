import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../src/reducers/counterSlice'
import alertReducer from './reducers/alertSlice'
export default configureStore({
  reducer: {
    counter: counterReducer,
    alert: alertReducer
  }
})


// import { applyMiddleware } from 'redux';
// import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducer from './reducers';
// import setAuthToken from './utils/setAuthToken';

// const initialState = {};

// const middleware = [thunk];

// const store = configureStore(
//   rootReducer,
//   initialState,
//   composeWithDevTools(applyMiddleware(...middleware))
// );

// /*
//   NOTE: set up a store subscription listener
//   to store the users token in localStorage
//  */

// /*
//   initialize current state from redux store for subscription comparison
//   preventing undefined error
//  */
// let currentState = store.getState();

// store.subscribe(() => {
//   // keep track of the previous and current state to compare changes
//   let previousState = currentState;
//   currentState = store.getState();
//   // if the token changes set the value in localStorage and axios headers
//   if (previousState.auth.token !== currentState.auth.token) {
//     const token = currentState.auth.token;
//     setAuthToken(token);
//   }
// });

// export default store;
