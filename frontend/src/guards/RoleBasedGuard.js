import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js'

import axios from '../utils/axios';
import { encryptKey } from '../config';
import { getUserDataRoute } from '../utils/APIRoutes';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['admin', 'leader']
  children: PropTypes.node.isRequired,
};

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  const token = localStorage.getItem('token')
  const decoded = jwtDecode(token);
  const nagivate = useNavigate();


      // const currentRole = 'user';
      const currentRole = CryptoJS.AES.decrypt(decoded.role, encryptKey).toString(CryptoJS.enc.Utf8); // admin;
      if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
        return hasContent ? (
          <>
          {nagivate("/403")}
          </>
        ) : null;
      }
    
      return <>{children}</>;
    }
    
