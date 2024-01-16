// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import jwtDecode from 'jwt-decode';
import Iconify from '../../components/Iconify';
// hooks
import useSettings from '../../hooks/useSettings';
import { newEarnCoin, GetLeaderBoardCoins } from '../../utils/APIRoutes';
import axios from '../../utils/axios';

// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWidgetRound,
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';
import { UserCard, SiteCard } from '../../sections/@dashboard/user/cards';
import RoleBasedGuard from '../../guards/RoleBasedGuard';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

// ----------------------------------------------------------------------


function staffBadge(){
  return (
    <Tooltip title="Force Team" placement="top" describeChild>
    <IconButton sx={{}}>
    <Iconify icon={'mdi:badge'} sx={{color: '#708090 ' }} width={20} height={20} />
    </IconButton>
    </Tooltip>
  )
}

function rocketBadge(){
  return (
    <Tooltip title="Rocket User" placement="top" describeChild>
    <IconButton sx={{ ml:-1,}}>
    <Iconify icon={'ion:rocket-sharp'} sx={{color: '#DC143C ' }} width={20} height={20} />
    </IconButton>
    </Tooltip>
  )
}

export default function EarnPage() {
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

  const [role, setRole] = useState();

    

    useEffect(() => {
      setInterval(()=>{
        (async function getData() {
                const data = await axios.get(`${newEarnCoin}`,{
                  headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                  }
                });
                    setCoins(data.data.coins);
                  })();
      }, 60000)
    }, [])
    useEffect(() => {
      setInterval(()=>{
        (async function getData() {
                const data = await axios.get(`${GetLeaderBoardCoins}`,{
                  headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                  }
                });
                    setLeader(data.data.top10)
                  })();
      }, 10000)
    }, [])

    useEffect(() => {
        (async function getData() {
                const data = await axios.get(`${GetLeaderBoardCoins}`,{
                  headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                  }
                });
                    setLeader(data.data.top10)
                  })();
    }, [setLeader])



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

    function renderBadge(user) {
      return (
        <>
        {user.company === 'Force Host' ? staffBadge() : '' }{user.isRocket ? rocketBadge() : '' }
        </>
      )
      
    }
    
    





  return (
    <Page title="Earning">
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
              <AppWidgetRound title="Coins Earned" total={`$${coins}`} icon={'fa-solid:money-bill'} chartData={12} />
            </Stack>
          </Grid>
        </Grid>

        
        <Divider sx={{mt: 2}}>Leaderboard</Divider>
        <Box sx={{ py: 4, display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)' }}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Username</TableCell>
            <TableCell align="right">Coins</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leader.map((row, index) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.username} {renderBadge(row)}
              </TableCell>
              <TableCell align="right">{row.credits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
          
        </Box>


      </Container>
    </Page>
  );
}
