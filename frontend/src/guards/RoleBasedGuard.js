import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import jwtDecode from 'jwt-decode';

// ----------------------------------------------------------------------

RoleBasedGuard.propTypes = {
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string), // Example ['admin', 'leader']
  children: PropTypes.node.isRequired,
};

export default function RoleBasedGuard({ hasContent, roles, children }) {
  // Logic here to get current user role
  const nagivate = useNavigate();
  const token = localStorage.getItem('token')
      const user = jwtDecode(token);

  // const currentRole = 'user';
  const currentRole = user?.role; // admin;

  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <>
      {nagivate("/403")}
      </>
    ) : null;
  }

  return <>{children}</>;
}
