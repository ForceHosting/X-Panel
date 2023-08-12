import { useState, useEffect } from 'react'
import { paramCase, capitalCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import axios from '../../utils/axios';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import UserNewEditForm from '../../sections/@dashboard/staff/users/UserNewEditForm';
import { getServerDetails } from '../../utils/APIRoutes';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function ViewServer() {
  const { themeStretch } = useSettings();
  const [server, setServer] = useState(null);
  const { pathname } = useLocation();
  const { id = '' } = useParams();


  useEffect(() => {
    (async function getData() {
        const data = await axios.get(`${getServerDetails}/${id}`,{
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
        setServer(data.data.serverDetails);
                })();
  }, [])

  return (
    <Page title="Edit Server">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading={'Edit Server'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.staff.users },
            { name: server?.serverName },
          ]}
        />
      </Container>
    </Page>
  );
}
