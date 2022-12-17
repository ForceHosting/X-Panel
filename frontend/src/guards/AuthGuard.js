import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH } from '../routes/paths';


// ----------------------------------------------------------------------

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default function AuthGuard({ children }) {
  const { isInitialized } = useAuth();

  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState(null);
  const [authenticated, setAuth] = useState();

  useEffect(() => {
    if(!localStorage.getItem('token')){
      setAuth(false)
    }else{
      setAuth(true)
    }
  }, [])

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
