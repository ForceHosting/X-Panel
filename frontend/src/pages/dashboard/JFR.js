// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Button } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
import { getUserDataRoute, getJFRServers } from '../../utils/APIRoutes';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { CommunityIllustration } from '../../assets';
import { JFRCard, GoldJFR } from '../../sections/@dashboard/user/cards';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

// ----------------------------------------------------------------------

export default function JFR() {
  const [user, setUserInfo] = useState([]);
  const [userMem, setMemory] = useState(null)
  const [userCPU, setCPU] = useState(null)
  const [userDisk, setDisk] = useState(null)
  const [userSlots, setSlots] = useState(null)
  const [userServers, setServers] = useState([])
  const [goldServers, setGoldServers] = useState([])
  const [ranOnce, setRanOnce] = useState(false);

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
        if(ranOnce === false){ 
          (async function getData() {
            const data = await axios.get(`${getJFRServers}`,{
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            });
            console.log(data);
                  setServers(data.data.jfrData);
                  setGoldServers(data.data.goldJFRData);
                      setRanOnce(true)
                    })();
                  }
  
            })
  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
        <Grid container spacing={1} >
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back, \n ${user.username}`}
              description="Take a look at all these cool servers you can join for resources!"
              img={
                <CommunityIllustration
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
            {goldServers.map((server) => (
            <GoldJFR key={user.id} server={server} background={serverBG[random]} />
          ))}
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}/>
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
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {userServers.map((server) => (
            <JFRCard key={user.id} server={server} background={serverBG[random]} />
          ))}
            
          
        </Box>
      </Container>
    </Page>
  );
}
