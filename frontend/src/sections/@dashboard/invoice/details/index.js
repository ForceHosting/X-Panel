import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  Grid,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';
// utils
import jwtDecode from 'jwt-decode';

import { fCurrency } from '../../../../utils/formatNumber';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Scrollbar from '../../../../components/Scrollbar';
//



// ----------------------------------------------------------------------

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

// ----------------------------------------------------------------------

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails({ invoice }) {
  const theme = useTheme();

  const [user, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  if (!invoice) {
    return null;
  }

  const {
    invoiceId,
    productName,
    productDescription,
    productPrice,
  } = invoice;
console.log(invoice)
  return (
    <>

      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Image disabledEffect visibleByDefault alt="logo" src="/logo/fhtrans.png" sx={{ maxWidth: 120 }} />
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                PayPal subscription
              </Label>

              <Typography variant="h6">{`INV-${invoiceId}`}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>
            <Typography variant="body2">Force Host</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>
            <Typography variant="body2">{user.username}</Typography>
            <Typography variant="body2">{user.email}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
          <TableContainer sx={{ minWidth: 960 }}>
            <Table>
              <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell >Product</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                  <TableRow
                    key={invoiceId}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{productName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="left">{productDescription}</TableCell>
                    <TableCell align="right">{fCurrency(productPrice)}</TableCell>
                    <TableCell align="right">{fCurrency(productPrice)}</TableCell>
                  </TableRow>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{fCurrency(productPrice)}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={3} />
                  <TableCell align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{fCurrency(productPrice)}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">NOTES</Typography>
            <Typography variant="body2">
              We appreciate your business. Hosting Todays for The Worlds Tomorrow.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>
            <Typography variant="body2">support@forcehost.net</Typography>
          </Grid>
        </Grid>
      </Card>
    </>
  );
}
