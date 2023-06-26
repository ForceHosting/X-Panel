// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
import { newEarnCoin } from '../../utils/APIRoutes';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';
import { UserCard, SiteCard } from '../../sections/@dashboard/user/cards';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

// ----------------------------------------------------------------------

export default function EarnPage() {
  const [user, setUserInfo] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeDone, setTimeDone] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { themeStretch } = useSettings();
  useEffect(() => { 
    setTimeout(()=>{
      (async function getData() {
              const data = await axios.get(`${newEarnCoin}`,{
                headers: {
                  'Authorization': `${localStorage.getItem('token')}`
                }
              });
                  console.log(data)
                })();
    }, 60000)
        })



    useEffect(() => {
      const timer =
        timeLeft > 0 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      if(timeLeft <= 0){
        setTimeLeft(60);
      }
    }, [timeLeft]);

    useEffect(() => {
      const timer2 =
        timeDone < 60 && setTimeout(() => setTimeDone(timeDone + 1), 1000);
        if(timeDone >= 60){
          setTimeDone(0);
        }
    }, [timeDone]);
  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back, \n ${user.username}`}
              description="While you idle here, you will be gain 1 coin per minute! You can use these coins to purchase resources!"
              img={
                <SeoIllustration
                  sx={{
                    p: 3,
                    width: 360,
                    margin: { xs: 'auto', md: 'inherit' },
                  }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} md={4} lg={4}>
            <Stack spacing={1}>
              <AppWidget title="Time Completed" total={`${timeLeft}`} icon={'fa-solid:clock'} chartData={Math.round(timeDone/60*100)} />
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{mt: 2}}>Leaderboard</Divider>
        <Box
          sx={{
            display: 'grid',
            gap: 3,
            mt: '20px',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
        The leaderboard is currently in the works of being completed.
          
        </Box>


      </Container>
    </Page>
  );
}
