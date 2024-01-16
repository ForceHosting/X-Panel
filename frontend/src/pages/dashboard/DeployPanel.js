import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import NewServerForm from '../../sections/@dashboard/server/NewServerForm';
import CreateXPanelForm from '../../sections/@dashboard/xpanel/CreateServerForm';

// ----------------------------------------------------------------------

export default function DeployPanel() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="Deploy X-Panel <SaaS>">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Deploy X-Panel' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'X-Panel', href: PATH_DASHBOARD.root },
            { name: 'New Deployment'},
          ]}
        />

        <CreateXPanelForm isEdit={isEdit} currentUser={currentUser}/>
      </Container>
    </Page>
  );
}
