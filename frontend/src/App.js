// routes
import Snowfall from 'react-snowfall'
import {useEffect, useState} from 'react';
import { useTheme } from '@mui/material/styles';

import {Box, Typography } from '@mui/material';
import Iconify from './components/Iconify';

import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ThemeSettings from './components/settings';
import { ChartStyle } from './components/chart';
import ScrollToTop from './components/ScrollToTop';
import { ProgressBarStyle } from './components/ProgressBar';
import NotistackProvider from './components/NotistackProvider';
import MotionLazyContainer from './components/animate/MotionLazyContainer';


// ----------------------------------------------------------------------

export default function App() {
  const currentYear = new Date().getFullYear();
  const [commitId, setCommitId] = useState(null);
  const [versionName, setVersionName] = useState(null);
  const [rayId, setRayId] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    const fetchCommitId = async () => {
      try {
        const response = await fetch('https://api.github.com/repos/forcehosting/x-panel/commits');
        const data = await response.json();

       // Ensure there are commits and reverse the array
       if (data.length > 0) {
        const reversedCommits = data.reverse();

        // Get the first seven characters of the most recent commit's SHA
        const latestCommitId = reversedCommits[0]?.sha?.substring(0, 7);

        setCommitId(latestCommitId);
      }
      // 
      const releaseRes = await fetch(`https://api.github.com/repos/forcehosting/x-panel/releases/latest`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      })
      const releaseData = await releaseRes.json();
      setVersionName(releaseData.name)

      // Ray ID
      const rayRes = await fetch(`https://handlers-forcehost.scarce.workers.dev/`)
      const rayData = await rayRes.json();
      const ogRay = rayData.cloudflareRayId;
      const result = ogRay.split('-')[0];
      setRayId(`Ray: ${result}`)
    } catch (error) {
      console.error('Error fetching commit ID:', error);
    }
  };

  fetchCommitId();
}, []);



  return (
    <>
    <MotionLazyContainer>
      
      <ThemeProvider>
      
        <ThemeSettings>
        
          <NotistackProvider>
            <ProgressBarStyle />
            <ChartStyle />
            <ScrollToTop />
            
            <Router />
            
            <Box
  component="footer"
  sx={{
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center',
    padding: 1, // optional padding
    zIndex: 10, // optional zIndex to ensure the footer is on top
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50px', // optional minimum height
    backdropFilter: 'blur(6px)', // Apply blur to the background
    backgroundColor: 'linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8))', // Gradient for fade
  }}
>
  <Typography variant="body2" color="#cbd5e1">
    Copyright {currentYear} - Force Host
    <br />
    <span style={{ display: 'inline-block' }}>
      <span><Iconify icon="jam:branch" color="#cbd5e1" /> {commitId}</span>
      <span style={{ paddingLeft: '10px'}}>|</span>
      <span style={{ paddingLeft: '10px'}}><Iconify icon="tabler:world" color="#cbd5e1" /> {versionName}</span>
      <span style={{ paddingLeft: '10px'}}>|</span>
      <span style={{ paddingLeft: '10px'}}><Iconify icon="mingcute:signal-fill" color="#cbd5e1" width="30" height="30" /> {rayId}</span>

    </span>
  </Typography>
</Box>
          </NotistackProvider>
        </ThemeSettings>
        
      </ThemeProvider>
      


    </MotionLazyContainer>
    </>
  );
}
