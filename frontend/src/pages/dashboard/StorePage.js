// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
import { newEarnCoin, GetLeaderBoardCoins } from '../../utils/APIRoutes';
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
import { StoreCard } from '../../sections/@dashboard/store';
import RoleBasedGuard from '../../guards/RoleBasedGuard';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

const storeItems = [
    {name: "Memory", img: "fa6-solid:memory", price: 2500, amount: '1024mib', itemId: 1, desc: "Buy some ram!"},
    {name: "Disk", img: "lucide:hard-drive", price: 1500, amount: '1024mib', itemId: 2, desc: "Buy some disk!"},
    {name: "CPU", img: "bi:cpu-fill", price: 2500, amount: '50%', itemId: 3, desc: "Buy some CPU!"},
    {name: "Server Slots", img: "basil:server-solid", price: 200, amount: '1 slot', itemId: 4, desc: "Buy some server slots!"},

]

// ----------------------------------------------------------------------

export default function StorePage() {
  const [user, setUserInfo] = useState([]);
  const [leader, setLeader] = useState([]);
  const [coins, setCoins] = useState('NaN');
  const [timeLeft, setTimeLeft] = useState(60);
  const [timeDone, setTimeDone] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { themeStretch } = useSettings();
  return (
    <Page title="Store">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back, \n ${user.username}`}
              description="You can purchase a whole bunch of different resources for your account. These resources help you create more powerful servers!"
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
        </Grid>

        <Box
          sx={{
            display: 'grid',
            gap: 3,
            mt: '20px',
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {storeItems.map((item) => (
            <StoreCard key={user.id} item={item} background={serverBG[random]} />
          ))}
            
          
        </Box>
      </Container>
    </Page>
  );
}
