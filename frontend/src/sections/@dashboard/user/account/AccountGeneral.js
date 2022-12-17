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

export default function AccountGeneral() {
  //  const { enqueueSnackbar } = useSnackbar();
  const [user, setUserInfo] = useState([]);
  const [pteroUser, setPteroUser] = useState(null);
  const [pteroPwd, setPteroPass] = useState(null); 
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
    const base64ToString = Buffer.from(userData.data.pteroPwd, "base64").toString();
    setPteroUser(userData.data.pteroUserId);
    setPteroPass(base64ToString)    
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
            <Typography>Control Username</Typography>
            <br/>
              <OutlinedInput sx={{mt:-3}} disabled={"true"} label={"Control Username"} value={pteroUser} onClick={() => navigator.clipboard.writeText(pteroUser)}/>
              <br/>
              <Typography>Control Password</Typography>
              <br/>
              <OutlinedInput sx={{mt:-3}} disabled={"true"} label={"Control Username"} value={pteroPwd} onClick={() => navigator.clipboard.writeText(pteroPwd)}/>
            </Box>

            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>

              <LoadingButton type="submit" variant="contained" >
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
  );
}
