import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import jwtDecode from 'jwt-decode';
import useAuth from '../hooks/useAuth';

// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_AUTH, PATH_PAGE } from '../routes/paths';


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
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
    if(!localStorage.getItem('token')){
      setAuth(false)
      return <Navigate to={PATH_AUTH.login} />
    }
    if (localStorage.getItem('token') === undefined){
      setAuth(false)
      return <Navigate to={PATH_AUTH.login} />;
    }
    if (localStorage.getItem('token') === "undefined"){
      setAuth(false)
      return <Navigate to={PATH_AUTH.login} />;
    }
    if(localStorage.getItem('token') === null) {
      setAuth(false)
      return <Navigate to={PATH_AUTH.login} />;
    }
    if(decoded.isBanned === true){
      setAuth(false)
      return <Navigate to={PATH_PAGE.banned} />;
    }
    if(decoded.exp * 1000 < Date.now()){
      setAuth(false)
      localStorage.removeItem('token')
      return <Navigate to={PATH_AUTH.login} />;
    }
      setAuth(true)
    
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
