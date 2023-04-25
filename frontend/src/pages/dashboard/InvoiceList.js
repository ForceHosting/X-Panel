import sumBy from 'lodash/sumBy';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useTabs from '../../hooks/useTabs';
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// _mock_
import { _invoices } from '../../_mock';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { TableNoData, TableEmptyRows, TableHeadCustom, TableSelectedActions } from '../../components/table';
// sections
import InvoiceAnalytic from '../../sections/@dashboard/invoice/InvoiceAnalytic';
import { InvoiceTableRow, InvoiceTableToolbar } from '../../sections/@dashboard/invoice/list';

import axios from '../../utils/axios';
import { fetchAllPaymentsRoute } from '../../utils/APIRoutes';


// ----------------------------------------------------------------------

const SERVICE_OPTIONS = [
  'all',
  'full stack development',
  'backend development',
  'ui design',
  'ui/ux design',
  'front end development',
];

const TABLE_HEAD = [
  { id: ''},
  { id: 'invoiceNumber', label: 'Client', align: 'left' },
  { id: 'price', label: 'Amount', align: 'center', width: 140 },

];

// ----------------------------------------------------------------------

export default function InvoiceList() {
  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [paymentLog, setPaymentLog] = useState([]);


  useEffect(() => {
    (async function getUData() {
      const data = await axios.get(fetchAllPaymentsRoute,{
        headers: {
          'Authorization': `${localStorage.getItem('token')}`
        }
      });
      console.log(data.data.payments);
      setPaymentLog(data.data.payments)
})();
}, []);

  const isNotFound = !paymentLog;

  const denseHeight = dense ? 56 : 76;

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  return (
    <Page title="Invoice: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invoice List"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Invoices', href: PATH_DASHBOARD.invoice.root },
            { name: 'List' },
          ]}
        />


        <Card>

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                />

                <TableBody>
                  {paymentLog.map((payment) => (
                    <InvoiceTableRow
                      key={payment._id}
                      row={payment}
                      onViewRow={() => handleViewRow(payment.invoiceId)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, paymentLog.length)} />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
