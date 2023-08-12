import { useState, useEffect } from 'react'
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import axios from '../../utils/axios';
// hooks
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/staff/users/UserNewEditForm';
import { getUserDetails } from '../../utils/APIRoutes';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function ViewUser() {
  const roles = ['mgmt', 'exec', 'fhfound', 'sysad'];
  const { themeStretch } = useSettings();
  const [user, setUser] = useState(null);
  const { pathname } = useLocation();
  const { id = '' } = useParams();


  useEffect(() => {
    (async function getData() {
        const data = await axios.get(`${getUserDetails}/${id}`,{
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
        setUser(data.data.userDetails);
                })();
  }, [])
console.log(user);
  return (
    <Page title="User: Create a new user">
      <RoleBasedGuard hasContent roles={roles}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading={'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.staff.users },
            { name: user?.username },
          ]}
        />

        <UserNewEditForm currentUser={user} />
      </Container>
      </RoleBasedGuard>
    </Page>
  );
}
