import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import NavScrollExample from './components/Header/Navbar';
import { Introduction } from './components/Home/Introduction';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from 'react-redux';
import store from './store'
import AutohideToast from './components/Utils/Toast';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './reducers/authSlice';
import { useAuth } from './actions/auth';
import { PrivateRoutes } from './components/Routes/PrivateRoutes'
import { Posts } from './components/Posts/Posts';
import { Profiles } from './components/Profiles/Profiles';
import RegisterForm from './components/Users/RegisterForm';


function App() {

  const { auth } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {

    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    auth();

    window.addEventListener('storage', () => {
      if (!localStorage.token) dispatch(LOGOUT());
    });
  }, [auth, dispatch]);

  return (
    <div>
      <Provider store={store}>
        <NavScrollExample />
        <AutohideToast />
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/profiles" element={<PrivateRoutes Component={Profiles} />} />
            <Route path="/posts" element={<PrivateRoutes Component={Posts} />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
