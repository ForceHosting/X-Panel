// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import useSettings from '../../hooks/useSettings';
import { getSiteStats, getServersRoute, getSitesRoute } from '../../utils/APIRoutes';
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

export default function GeneralStaff() {
  const roles = ['sprt', 'mgmt', 'exec', 'fhfound', 'sysad'];
  const [user, setUserInfo] = useState([]);
  const [users, setUsers] = useState(null)
  const [servers, setServers] = useState(null)
  const [tickets, setTickets] = useState(null)
  const [sites, setSites] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { themeStretch } = useSettings();
    useEffect(() => {
        
    (async function getUData() {
        const userData = await axios.get(`${getSiteStats}`,{
          headers: {
            'Authorization': `${localStorage.getItem('token')}`
          }
        });
        console.log(userData)
        setUsers(userData.users)
        setServers(userData.servers)
        setTickets(userData.tickets)
        setSites(userData.sites)
        
        
    })();
    }, [])


  return (
    <Page title="Home">
    <RoleBasedGuard hasContent roles={roles}>
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back, \n ${user.username}`}
              description="View and manage all the users from one place!"
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
              <AppWidget title="Memory" total={users} icon={'fa-solid:memory'} />
              <AppWidget title="CPU" total={tickets} icon={'mdi:memory'} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}>
              <AppWidget title="Disk" total={sites} icon={'clarity:hard-disk-solid'} />
              <AppWidget title="Server Slots" total={servers} icon={'icon-park-solid:memory-one'} />
            </Stack>
          </Grid>
        </Grid>
        <Divider>SERVERS</Divider>
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
        />
            
          

        <Divider>WEBSITES</Divider>

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
        />
      </Container>
      </RoleBasedGuard>
    </Page>
  );
}
