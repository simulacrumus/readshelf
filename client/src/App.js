import './App.css';
import { useEffect } from 'react';

import Modal from 'react-modal';
import {configStore} from './configStore';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PrivateRoute from './routing/PrivateRoute';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/user/loadUser';
import BookDetails from './pages/Book';
import Bookshelf from './pages/Bookshelf';
import Reviews from './pages/Reviews';
import Wishlist from './pages/Wishlist';
import { theme } from './theme';
import { ThemeProvider } from '@mui/material/styles';
import {Box, CssBaseline} from '@mui/material';
import UserProfile from './pages/UserProfile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPasswordRequest from './pages/ResetPasswordRequest';
import Navbar from './components/layout/Navbar';
import Profile from './pages/Profile';
import VerifyEmailAlert from "./pages/VerifyEmailAlert";
import RequestResetPasswordResult from './pages/RequestResetPasswordResult';
import ResetPassword from './pages/ResetPassword';
import ResetPasswordResult from './pages/ResetPasswordResult';
import NotFound404 from './pages/NotFound404';
import VerifyEmail from './pages/VerifyEmail';
import Landing from './pages/Landing';
import Search from './pages/Search'
import { USER_LOGOUT } from './actions/types';
import { PersistGate } from 'redux-persist/integration/react'

const { persistor, store } = configStore()

Modal.setAppElement('#root')

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: USER_LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <Navbar />
            <Box sx={{mt: {md: 13, xs: 10}}}/>
            <Routes>
              <Route path="/" element={<Landing/>}/>
              <Route path="/home" element={<PrivateRoute component={Home}/>}/>
              <Route path='/login' element={<Login/>} />
              <Route path='/signup' element={<Signup/>} />
              <Route path='/request-reset-password' element={<ResetPasswordRequest/>} />
              <Route path='/request-reset-password/result' element={<RequestResetPasswordResult/>} />
              <Route path='/reset-password' element={<ResetPassword/>} />
              <Route path='/reset-password/result' element={<ResetPasswordResult/>} />
              <Route path="/verify-email" element={<VerifyEmail/>}/>
              <Route path="/verify-email-alert" element={<VerifyEmailAlert/>}/>
              <Route path="/profile" element={<PrivateRoute component={UserProfile}/>}/>
              <Route path="/profile/:username" element={<PrivateRoute component={Profile}/>}/>
              <Route path="/books/:id" element={<PrivateRoute component={BookDetails}/>}/>
              <Route path="/search" element={<PrivateRoute component={Search}/>}/>
              <Route path="/search/:query" element={<PrivateRoute component={Search}/>}/>
              <Route path="/bookshelf" element={<PrivateRoute component={Bookshelf}/>}/>
              <Route path="/reviews" element={<PrivateRoute component={Reviews}/>}/>
              <Route path="/wishlist" element={<PrivateRoute component={Wishlist}/>}/>
              <Route path="*" element={<NotFound404/>}/>
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
