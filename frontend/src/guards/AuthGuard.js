import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH, PATH_PAGE } from '../routes/paths';

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isInitialized } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Add the useNavigate hook

  const [requestedLocation, setRequestedLocation] = useState(null);
  const [authenticated, setAuth] = useState();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      setAuth(false);
      navigate(PATH_AUTH.login); // Use navigate instead of return <Navigate />
    } else {
      const token = localStorage.getItem('token');
      const decoded = jwtDecode(token);
      if (decoded.isBanned === true) {
        setAuth(false);
        navigate(PATH_PAGE.banned); // Use navigate instead of return <Navigate />
      } else if (decoded.exp * 1000 < Date.now()) {
        setAuth(false);
        localStorage.removeItem('token');
        navigate(PATH_AUTH.login); // Use navigate instead of return <Navigate />
      } else {
        setAuth(true);
      }
    }
  }, [navigate]); // Add navigate to the dependency array to avoid missing updated navigate reference

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (authenticated === false) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to={PATH_AUTH.login} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}