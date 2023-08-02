// @mui
import { useState, useEffect, componentDidMount } from 'react';

import { Container, Grid, Stack, Box, Divider, Button } from '@mui/material';

// hooks
import jwtDecode from 'jwt-decode';
import RoleBasedGuard from '../../guards/RoleBasedGuard';
import useSettings from '../../hooks/useSettings';
import { getSiteStats, getServersRoute, getAllUsers } from '../../utils/APIRoutes';
import axios from '../../utils/axios';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { MotivationIllustration } from '../../assets';
import { UserCard, SiteCard } from '../../sections/@dashboard/staff/cards';

const serverBG = [
  "https://wallpaperaccess.com/download/minecraft-121124",
  "https://wallpaperaccess.com/download/minecraft-196557",
  "https://wallpaperaccess.com/download/minecraft-533352"
];
const random = Math.floor(Math.random() * serverBG.length);

// ----------------------------------------------------------------------

export default function UserList() {
  const roles = ['sprt', 'mgmt', 'exec', 'fhfound', 'sysad'];
  const [user, setUserInfo] = useState();
  const [users, setUsers] = useState([])
  const [ranOnce, setRanOnce] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);



  const { themeStretch } = useSettings();

  


    useEffect(() => {
          setCurrentPage(0)
      }, [])

    useEffect(() => {
        if(ranOnce === false){ 
          (async function getData() {
            const data = await axios.get(`${getAllUsers}/${currentPage}`,{
              headers: {
                'Authorization': `${localStorage.getItem('token')}`
              }
            });
                  setUsers(data.data.allUsers);
                      setRanOnce(true)
                    })();
                  }
  
            })

            const furtherPage = async (event,page) => {
              const newPage = page + 1;
              if(newPage < 0){
                console.log('no!');
              }else{
              const getNewData = await axios.get(`${getAllUsers}/${newPage}`,
              {headers:
                {'Authorization': `${localStorage.getItem('token')}`
              }}
              );
              setCurrentPage(newPage);
              setUsers(getNewData.data.allUsers);
            }
            }
            const prevPage = async (event,page) => {
              const newPage = page - 1;
              if(newPage <= -1){
                console.log('no!');
              }else{
              const getNewData = await axios.get(`${getAllUsers}/${newPage}`,
              {headers:
                {'Authorization': `${localStorage.getItem('token')}`
              },
          }
              );
              setCurrentPage(newPage);
              setUsers(getNewData.data.allUsers);

            }
            }
  return (
    <Page title="Staff">
    <RoleBasedGuard hasContent roles={roles}>
      <Container maxWidth={themeStretch ? false : 'xl'} spacing={1}>
      <Grid container spacing={1} >
          <Grid item xs={12} md={8} lg={4}>
            <AppWelcome
              title={`Welcome back`}
              description="Take a look at all the public servers that we host!"
              img={
                <MotivationIllustration
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
            <Button variant="contained" sx={{mt: 10}} color="primary" onClick={(event) => prevPage(event, currentPage)}>
  Previous Page
</Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={1}>
            <Button variant="contained" sx={{ mt: 10}} color="primary" onClick={(event) => furtherPage(event, currentPage)}>
  Next Page
</Button>
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
          {users.map((usr) => (
            <UserCard key={usr.uid} user={usr} />
          ))}
            
          
        </Box>
      </Container>
      </RoleBasedGuard>
    </Page>
  );
}
