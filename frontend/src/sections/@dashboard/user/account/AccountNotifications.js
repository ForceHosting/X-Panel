// @mui
import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Card, Typography } from '@mui/material';


// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export default function AccountNotifications() {
  const [user, setUserInfo] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
      console.log(decoded)
  }, [])
  return (
    <Card sx={{ p: 3 }}>
      <Typography sx={{ fontSize: 25 }}>Link Account to Discord</Typography>
      <Typography>To link your Force Host account to Discord, please navigate to our Discord server and run the command /acclink</Typography>
      <Typography sx={{ fontSize: 25, marginTop: 2}}>Code:</Typography>
      <Typography>{user.linkId}</Typography>
    </Card>
  );
}
