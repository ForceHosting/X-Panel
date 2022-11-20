import { useEffect } from 'react';

// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
//
import { MotivationIllustration } from '../../assets/index';


// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Authing() {

useEffect(()=>{
    (async function getData(){
    const res = await axios.get('http://localhost:25566/api/auth/discord/data');
      console.log(res)
      //    localStorage.setItem('token', res.data)
    })();
})

  return (
    <Page title="Authorizing">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
        <MotivationIllustration
         sx={{ my: 10, height: 240 }} />
          <Typography variant="h3" paragraph>
            Account Authorization
          </Typography>
          <Typography sx={{ color: 'text.secondary', marginBottom: 2 }}>Please wait while your account connects to our secure servers to gather your information.</Typography>
        </ContentStyle>
      </Container>
    </Page>
  );
}
