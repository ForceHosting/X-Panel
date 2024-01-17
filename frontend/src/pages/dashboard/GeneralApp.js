// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack, Box, Divider, Typography, Button, Modal, TextField } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
import { getUserDataRoute, getServersRoute, getSitesRoute, updateServerRoute } from '../../utils/APIRoutes';
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
import { UserCard, SiteCard, QueueCard } from '../../sections/@dashboard/user/cards';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


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
  const [queueServers, setQueue] = useState([]);
  const [formData, setFormData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

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
            console.log(data.data)
                setServers(data.data.servers);
                setQueue(data.data.queued)

                
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
            console.log(data.data)
                  setServers(data.data.servers);
                  setQueue(data.data.queued)
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



                const [open, setOpen] = useState(false);
                const handleOpen = (fData) => {
                  setOpen(true);
                  setFormData(fData);
                };
                const handleClose = () => {
                  setOpen(false);
                };     

                const handleChange = (event) => {
                  setFormData({
                    ...formData,
                    [event.target.name]: event.target.value,
                  });
                  console.log(formData)
                };



                const handleSubmit = async () => {
                    setIsSubmit(true)
                    const { sid, memory, disk, cpu} = formData;
                    const {data} = await axios.patch(`${updateServerRoute}`,{sid,memory,disk,cpu},{
                      headers: {
                        'Authorization': `${localStorage.getItem('token')}`
                      }
                    });
                    console.log(data)
                    if(data.status === 400){
                    setIsSubmit(false);
                }
                };

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
            <UserCard key={user.id} server={server} background={serverBG[random]} handleOpen={handleOpen} />
          ))}
            
          
        </Box>
        <Divider>QUEUED</Divider>

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
          {queueServers.map((server) => (
            <QueueCard key={user.id} server={server} background={serverBG[random]} />
          ))}
        </Box>
        <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="parent-modal-title"
  aria-describedby="parent-modal-description"
>
  <Box sx={{ ...style, width: 400 }}>
    <h2 id="parent-modal-title">Edit Your Resources</h2>
    <Grid item xs={12} md={12} alignItems="center" sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 2,
                mb: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}>

              <TextField
                label="Name"
                name="name"
                value={formData.name}
                disabled
                fullWidth
                margin="normal"
              />
              <TextField
                label="Memory"
                name="memory"
                type="number"
                value={formData.memory}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                label="CPU"
                type="number"
                name="cpu"
                value={formData.cpu}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              <TextField
                label="Disk"
                type="number"
                name="disk"
                value={formData.disk}
                fullWidth
                margin="normal"
                onChange={handleChange}
              />
              </Grid>
              <Grid item xs={12} md={12} alignItems="center" sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 2,
                mb: 2,
                gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(3, 1fr)' },
              }}>
                <div/>
              <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isSubmit === true}
          >
            Submit
          </Button>
              </Grid>
  </Box>
</Modal>
      </Container>
    </Page>
  );
}
