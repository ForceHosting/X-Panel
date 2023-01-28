import { useState } from 'react'
import { m } from 'framer-motion';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Link, Stack, Button, Divider, Container, Typography } from '@mui/material';
// _mock_
import { _homePlans } from '../../_mock';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { varFade, MotionViewport } from '../../components/animate';
import NewServerForm from '../@dashboard/webhosting/NewServerForm';
import PPButton from '../../components/PayPalBtn';
import axios from '../../utils/axios';
import { createNewPaymentWeb } from '../../utils/APIRoutes';

let subscriptionId;
let orderId;

const beginnerSubscribe = (data, actions) => {
    return actions.subscription.create({
        'plan_id': "P-4EN63166VY7121519MPGZDUI"
    });
    };
const businessSubscribe = (data, actions) => {
    return actions.subscription.create({
        'plan_id': "P-61E09491U9021971MMPGZESY"
    });
};
const startupSubscribe = (data, actions) => {
  return actions.subscription.create({
      'plan_id': "P-9M247967P6522042MMPGZF2A"
  });
};
    const paypalOnError = (err) => {
    console.log("Error")
    }
    const paypalOnApprove = (data, detail, price) => {
    // call the backend api to store transaction details
    console.log("Payapl approved")
    console.log(data)
    subscriptionId = data.subscriptionID;
    orderId = data.orderID;
    (async () => {
    const webdata = await axios.post(createNewPaymentWeb,{subscriptionId, orderId, price},{
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
    console.log(webdata)
  })
  ();
    };

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomePricingPlans() {

  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ mb: 10, mt: -15, textAlign: 'center' }}>
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              pricing plans
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              The right plan for your business
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography
              sx={{
                color: isLight ? 'text.secondary' : 'text.primary',
              }}
            >
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
            <m.div>
                <BeginnerCard />
            </m.div>
        </Grid>
        <Grid item xs={12} md={4}>
            <m.div>
                <StartupPlan />
            </m.div>
        </Grid>
        <Grid item xs={12} md={4}>
            <m.div>
                <BusinessPlan />
            </m.div>
        </Grid>
        </Grid>

        <m.div variants={varFade().in}>
          <Box sx={{ p: 5, mt: 10, textAlign: 'center' }}>
            <m.div variants={varFade().inDown}>
              <Typography variant="h3">Don't want to pay?</Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ mt: 3, mb: 1, color: 'text.secondary' }}>
                Fill out the form below to register for free! 
              </Typography>
              <Typography sx={{ mt: 0, mb: 5, color: 'text.secondary', fontSize: 'small' }}>
                Please visit our Discord to see the available resources for this plan.
              </Typography>
            </m.div>

            <m.div variants={varFade().inUp}>
              <NewServerForm />
            </m.div>
          </Box>
        </m.div>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

function BeginnerCard(){
    const commons = ['Free Support', 'Site Builder', 'NVMe SSD'];
    const options = ['25GB Storage', '50GB Bandwidth', '2 Domains', '10 Subdomains', '10 Emails'];
   return (
    <Card
      sx={{
        p: 5,
        boxShadow: 0,
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
            $2 Monthly
          </Typography>
          <Typography variant="h4">Beginner</Typography>
        </div>

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Iconify icon={'eva:checkmark-fill'} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option, optionIndex) => {

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                key={option}
              >
                <Iconify
                  icon={'eva:checkmark-fill'}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'primary.main',
                  }}
                />
                <Typography variant="body2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <PPButton
        amount="2"
        currency="USD"
        createSubscription={beginnerSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
        price="2"
        />
      </Stack>
    </Card>
   ) 
}
function StartupPlan(){
    const commons = ['Free Support', 'Site Builder', 'NVMe SSD'];
    const options = ['100GB Storage', '200GB Bandwidth', '10 Domains', 'Unlimited Subdomains', '25 Emails'];
   return (
    <Card
      sx={{
        p: 5,
        boxShadow: 0,
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
            $8 Monthly
          </Typography>
          <Typography variant="h4">Startup</Typography>
        </div>

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Iconify icon={'eva:checkmark-fill'} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option, optionIndex) => {

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                key={option}
              >
                <Iconify
                  icon={'eva:checkmark-fill'}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'primary.main',
                  }}
                />
                <Typography variant="body2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <PPButton
        amount="8"
        currency="USD"
        createSubscription={startupSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
        price="8"
        />
      </Stack>
    </Card>
   ) 
}

function BusinessPlan(){
    const commons = ['Free Support', 'Site Builder', 'NVMe SSD'];
    const options = ['500GB Storage', 'Unlimited Bandwidth', '20 Domains', 'Unlimited Subdomains', '100 Emails'];
   return (
    <Card
      sx={{
        p: 5,
        boxShadow: 0,
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
            $12 Monthly
          </Typography>
          <Typography variant="h4">Business</Typography>
        </div>

        <Stack spacing={2.5}>
          {commons.map((option) => (
            <Stack key={option} spacing={1.5} direction="row" alignItems="center">
              <Iconify icon={'eva:checkmark-fill'} sx={{ color: 'primary.main', width: 20, height: 20 }} />
              <Typography variant="body2">{option}</Typography>
            </Stack>
          ))}

          <Divider sx={{ borderStyle: 'dashed' }} />

          {options.map((option, optionIndex) => {

            return (
              <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                key={option}
              >
                <Iconify
                  icon={'eva:checkmark-fill'}
                  sx={{
                    width: 20,
                    height: 20,
                    color: 'primary.main',
                  }}
                />
                <Typography variant="body2">{option}</Typography>
              </Stack>
            );
          })}
        </Stack>

        <PPButton
        amount="12"
        currency="USD"
        createSubscription={businessSubscribe}
        onApprove={paypalOnApprove}
        catchError={paypalOnError}
        onError={paypalOnError}
        onCancel={paypalOnError}
        price = "12"
        />
      </Stack>
    </Card>
   ) 
}