import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import HomePricingPlans from '../../sections/home/HomePricingPlan';

import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userList } from '../../_mock';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import NewServerForm from '../../sections/@dashboard/webhosting/NewServerForm';

// ----------------------------------------------------------------------

export default function CreateWeb() {
  const { themeStretch } = useSettings();

  const { pathname } = useLocation();

  const { name = '' } = useParams();

  const isEdit = pathname.includes('edit');

  const currentUser = _userList.find((user) => paramCase(user.name) === name);

  return (
    <Page title="User: Create a new website">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a Web User' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Webhosting', href: PATH_DASHBOARD.root },
            { name: 'New Web'},
          ]}
        />
        <HomePricingPlans isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
