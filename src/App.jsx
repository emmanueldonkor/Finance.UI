import {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'; // import Navigate instead of Switch
import HomePage from './app/HomePage';
import SignUpPage from './app/components/SignUpPage';
import SignInPage from './app/components/SignInPage';
import {useSelector, useDispatch} from 'react-redux';
import {userAuthenticated} from './app/authenticationSlice';
import NavBar from './app/components/NavBar';
import {GoogleOAuthProvider} from '@react-oauth/google';
import StatisticsPage from './app/components/StatisticsPage';


export default function App() {
  const {isLoggedIn} = useSelector(state => state.authenticationSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token !== undefined && token !== null) {
      dispatch(userAuthenticated({token}));
    }
  }, [dispatch]);
  return (
    <GoogleOAuthProvider
      clientId={
        import.meta.CLIENT_ID
      }
    >
      <BrowserRouter>
        <NavBar />
      
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn ? <HomePage /> : <SignInPage />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <Navigate to="/" replace /> : <SignUpPage />}
          />
          <Route
            path="/signin"
            element={isLoggedIn ? <Navigate to="/" replace /> : <SignInPage />}
          />
           <Route
            path="/statistics"
            element={isLoggedIn ? <StatisticsPage /> : <SignInPage />}
          />
          <Route path="*" element={<h2>Page Not found</h2>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}
