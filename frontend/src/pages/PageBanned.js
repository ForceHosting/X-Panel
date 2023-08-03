import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container } from '@mui/material';
// components
import Page from '../components/Page';
import { MotionContainer, varBounce } from '../components/animate';
// assets
import { BannedIllustration } from '../assets';

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
const audio = new Audio(
  "https://github.com/catocodedev/site/raw/main/assets/Meow.wav"
);
const play = () => {
  audio.play();
};

localStorage.setItem('banned', true);
export default function PageBanned() {
  return (
    <Page title="404 Page Not Found">
      <Container component={MotionContainer}>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <m.div variants={varBounce().in}>
            <Typography variant="h2" paragraph>
              Uh Oh!
            </Typography>
            <Typography variant="h3" paragraph>
              It seems your banned!
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography sx={{ color: 'text.secondary' }}>
              Sadly, our system shows that your account has been banned. 
              <br/>If you beleive this is a mistake, please contact support via our Discord
            </Typography>
          </m.div>

          <m.div onClick={play} variants={varBounce().in}>
            <BannedIllustration sx={{ height: 260, my: { xs: 5, sm: 10 } }} />
          </m.div>
          <Button href="https://discord.gg/forcehost" size="large" variant="contained">
            Visit our Discord
          </Button>
        </ContentStyle>
      </Container>
    </Page>
  );
}
