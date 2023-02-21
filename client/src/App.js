import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavScrollExample from './components/Navbar';
import { Introduction } from './components/Introduction';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from './components/Register';
import { Profiles } from './components/Profiles';
import { Posts } from './components/Posts';
import { Provider } from 'react-redux';
import store from './store'
import AutohideToast from './components/Toast';


function App() {
  return (
    <div>
      <Provider store={store}>
        <NavScrollExample />
        <AutohideToast />
        <Router>
          <Routes>
            <Route path="/" element={<Introduction />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
