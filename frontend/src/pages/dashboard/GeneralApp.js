// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
import { getUserDataRoute, getServersRoute, getSitesRoute } from '../../utils/APIRoutes';
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

export default function GeneralApp() {
  const [user, setUserInfo] = useState([]);
  const [userMem, setMemory] = useState(null)
  const [userCPU, setCPU] = useState(null)
  const [userDisk, setDisk] = useState(null)
  const [userSlots, setSlots] = useState(null)
  const [userServers, setServers] = useState([])
  const [ranOnce, setRanOnce] = useState(false);
  const [userSites, setSites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { themeStretch } = useSettings();

  useEffect(() => {
    (async function getUData() {
    const userData = await axios.get(`${getUserDataRoute}`,{
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
    setMemory(userData.data.availMem)
    setCPU(userData.data.availCPU)
    setDisk(userData.data.availDisk)
    setSlots(userData.data.availSlots)
    
    
})();
}, []);

useEffect(() => { 
  setInterval(()=>{
    (async function getData() {
            const data = await axios.get(`${getServersRoute}`,{
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            });
                setServers(data.data.servers);
                
              })();
  }, 120000)
      })
      
      useEffect(() => {
        if(ranOnce === false){ 
          (async function getData() {
            const data = await axios.get(`${getServersRoute}`,{
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            });
                  setServers(data.data.servers);
                      setRanOnce(true)
                    })();
                  }
  
            })


            useEffect(() => {
              setInterval(()=>{
              (async function getData() {
                const data = await axios.get(`${getSitesRoute}`,{
                  headers: {
                    'Authorization': `${localStorage.getItem('token')}`
                  }
                });
                          setSites(data.data.webData);
                        })();
                      }, 240000)
                      
      
                })

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back, \n ${user.username}`}
              description="Manage your servers, websites, and account all from one place!"
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
              <AppWidget title="Memory" total={userMem} icon={'fa-solid:memory'} chartData={userMem / 10240 * 100} />
              <AppWidget title="CPU" total={userCPU} icon={'mdi:memory'} chartData={userCPU / 500 * 100} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}>
              <AppWidget title="Disk" total={userDisk} icon={'clarity:hard-disk-solid'} chartData={userDisk / 25600 * 100} />
              <AppWidget title="Server Slots" total={userSlots} icon={'icon-park-solid:memory-one'} chartData={userSlots / 10 * 100} />
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
        >
          {userServers.map((server) => (
            <UserCard key={user.id} server={server} background={serverBG[random]} />
          ))}
            
          
        </Box>
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
        >
          {userSites.map((site) => (
            <SiteCard key={user.id} server={site} background={serverBG[random]} />
          ))}
        </Box>
      </Container>
    </Page>
  );
}
