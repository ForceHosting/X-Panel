// @mui
import { useState, useEffect } from 'react';
import { Container, Grid, Stack } from '@mui/material';
// hooks
import jwtDecode from 'jwt-decode';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome
} from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const [user, setUserInfo] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  const { themeStretch } = useSettings();

  return (
    <Page title="Home">
      <Container maxWidth={themeStretch ? false : 'xl'} >
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
            <Stack spacing={3}>
              <AppWidget title="Memory" total={1024} icon={'fa-solid:memory'} chartData={10} />
              <AppWidget title="CPU" total={50} icon={'mdi:memory'} chartData={25} />
            </Stack>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Disk" total={10240} icon={'clarity:hard-disk-solid'} chartData={50.6} />
              <AppWidget title="Server Slots" total={2} icon={'icon-park-solid:memory-one'} chartData={40} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
