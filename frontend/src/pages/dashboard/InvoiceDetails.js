import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// _mock_
import { _invoices } from '../../_mock';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import Invoice from '../../sections/@dashboard/invoice/details';
import axios from '../../utils/axios';
import { fetchPaymentDetailsRoute } from '../../utils/APIRoutes';

// ----------------------------------------------------------------------

export default function InvoiceDetails() {
  const { themeStretch } = useSettings();

  const { id } = useParams();

  const [invoice, setInvoice] = useState();

  useEffect(() => {
    (async function getUData() {
      const data = await axios.get(`${fetchPaymentDetailsRoute}/${id}`,{
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      setInvoice(data.data.paymentInfo);
})();
}, []);

  return (
    <Page title="Invoice: View">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Invoices',
              href: PATH_DASHBOARD.invoice.root,
            },
            { name: `INV-${invoice?.invoiceNumber}` || '' },
          ]}
        />

        <Invoice invoice={invoice} />
      </Container>
    </Page>
  );
}
