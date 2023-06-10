import { useState, useEffect } from 'react';
// form
import jwtDecode from 'jwt-decode';
// @mui

import { Box, Grid, Card, Stack, Typography, OutlinedInput} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import {Buffer} from 'buffer';
import axios from '../../../../utils/axios';
import { getUserDataRoute } from '../../../../utils/APIRoutes';

// ----------------------------------------------------------------------

export default function ReferralAccount() {
  //  const { enqueueSnackbar } = useSnackbar();
  const [user, setUserInfo] = useState([]);
  const [refCode, setRefCode] = useState(null);
  const [refUses, setRefUses] = useState(null); 
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
  }, [])

  useEffect(() => {
    (async function getUData() {
    const userData = await axios.get(`${getUserDataRoute}`,{
      headers: {
        'Authorization': `${localStorage.getItem('token')}`
      }
    });
    setRefCode(userData.data.refCode);
    setRefUses(userData.data.refUses);
    console.log(`Hey, ${user.username}! Want a job?`)
})();
}, [user]);

  return (
      <Grid container spacing={3}>


        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
            <Typography>Referral Link</Typography>
            <br/>
              <OutlinedInput sx={{mt:-3}} disabled={"true"} label={"Referral Link"} value={`https://my.forcehost.net/api/ref/?ref=${refCode}`} onClick={() => navigator.clipboard.writeText(`https://my.forcehost.net/api/ref/?ref=${refCode}`)}/>
              <br/>
            </Box>
          </Card>
        </Grid>
      </Grid>
  );
}
