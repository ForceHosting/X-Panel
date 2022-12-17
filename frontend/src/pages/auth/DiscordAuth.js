import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container } from '@mui/material';
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
  const navigate = useNavigate();
useEffect(()=>{
    (async function getData(){
    const res = await axios.get('/api/auth/discord/data');
    if(res.status === 200){
      localStorage.setItem('token', res.data)
      navigate("/app")
    }else{
      navigate("/auth/login")
    }
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
