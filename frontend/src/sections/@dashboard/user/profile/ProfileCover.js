import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, IconButton } from '@mui/material';
// utils
import Tooltip from '@mui/material/Tooltip';
import cssStyles from '../../../../utils/cssStyles';
// hooks
import useAuth from '../../../../hooks/useAuth';
// components
import UserAvatar from '../../../../components/UserAvatar';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';




// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur: 2, color: theme.palette.primary.darker }),
    top: 0,
    zIndex: 9,
    content: "''",
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
}));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

ProfileCover.propTypes = {
  myProfile: PropTypes.object,
};

function staffBadge(){
  return (
    <Tooltip title="Force Team" placement="top" describeChild>
    <IconButton sx={{mb:1}}>
    <Iconify icon={'mdi:badge'} sx={{color: '#708090 ' }} width={22} height={22} />
    </IconButton>
    </Tooltip>
  )
}

function rocketBadge(){
  return (
    <Tooltip title="Rocket User" placement="top" describeChild>
    <IconButton sx={{mb:1, ml:-1}}>
    <Iconify icon={'ion:rocket-sharp'} sx={{color: '#DC143C ' }} width={22} height={22} />
    </IconButton>
    </Tooltip>
  )
}


export default function ProfileCover({ myProfile }) {
  const { user } = useAuth();

  const { position, profileCover, compRole, company, isRocket } = myProfile;

  return (
    <RootStyle>
      <InfoStyle>
        <UserAvatar
          user={myProfile}
          sx={{
            mx: 'auto',
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: 'common.white',
            width: { xs: 80, md: 128 },
            height: { xs: 80, md: 128 },
          }}
        />
        <Box
          sx={{
            ml: { md: 3 },
            mt: { xs: 1, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h4">{myProfile?.username}{company === 'Force Host' ? staffBadge() : '' }{isRocket ? rocketBadge() : '' }</Typography>
          <Typography sx={{ opacity: 0.72 }}>{compRole}</Typography>
        </Box>
      </InfoStyle>
      <Image alt="profile cover" src={profileCover} sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
    </RootStyle>
  );
}
