import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import jwtDecode from 'jwt-decode';
import { styled } from '@mui/material/styles';
import { Box, Link, Typography } from '@mui/material';
import CryptoJS from 'crypto-js'
import { encryptKey } from '../../../config';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import MyAvatar from '../../../components/MyAvatar';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

NavbarAccount.propTypes = {
  isCollapse: PropTypes.bool,
};

export default function NavbarAccount({ isCollapse }) {

  const [user, setUserInfo] = useState([]);
  const [role, setRole] = useState();

  useEffect(() => {
    const token = localStorage.getItem('token')
      const decoded = jwtDecode(token);
      setUserInfo(decoded)
      setRole(CryptoJS.AES.decrypt(decoded.role, encryptKey).toString(CryptoJS.enc.Utf8))
  }, [])

  return (
    <Link underline="none" color="inherit" component={RouterLink} to={PATH_DASHBOARD.user.account}>
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar user={user} name={user.username}/>

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {user?.username}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {role}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
